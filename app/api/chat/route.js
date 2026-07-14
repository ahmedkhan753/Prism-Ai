import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─── Model ───────────────────────────────────────────────────────────────────
const GEMINI_MODEL = "gemini-2.0-flash";

// ─── System prompt (knowledge base) ──────────────────────────────────────────
const SYSTEM_PROMPT = `You are "Prism Assistant", the friendly AI assistant on the website of Prism — an AI solutions agency that builds AI automation for real estate and construction businesses.

Your job: answer visitors' questions about Prism, our services, how we work, and how to get started. Be warm, concise, and professional (2–4 sentences). Use plain language. If the user writes in Urdu or Roman Urdu, reply in the same style.

ABOUT PRISM
- Prism builds human-guided AI systems that handle the repetitive front-office and operations work for real estate agencies, brokers, property management firms, and construction & property businesses — so their teams capture every lead and close more deals.
- Everything runs with human oversight: the team reviews, approves, and coaches the AI.
- We integrate with the client's existing CRM and tools. Setup is fast — live in days, not months.

WHAT WE OFFER (services)
- Conversations: AI Voice Receptionist (answers calls, pre-qualifies, books viewings into the CRM); Website & WhatsApp Chatbot (24/7 answers, captures visitor details); Automated Lead Qualification (scores leads Hot/Warm/Cold and routes them).
- Operations: Tour & Viewing Scheduling; CRM Automation & Sync; Maintenance & Tenant Support routing; Outbound Lead Nurturing (re-engages old/cold leads).
- Content: Listing & Content Generation; Automated Review Generation (Google/Facebook).
- Advanced: Full Property Management AI; AI-Powered Property Valuation (AVM); Predictive Analytics; Lease Abstraction & Document AI; White-Label AI Platform; AI-Powered Ad Optimization.

PACKAGES
- Starter (first AI wins, 1–2 weeks), Growth (most popular — scale conversations + operations), Enterprise (custom systems for agencies & property firms), and an All-in-One done-for-you flagship that combines several services into one operation.

HOW WE WORK
1) Free AI Audit — we map the workflow and find the highest-impact automations.
2) Build & Integrate — we build the agents and connect them to the client's tools.
3) Human-Guided Launch — the AI goes live with the client reviewing and coaching it.

CONTACT
- Book a demo on this site, or email prism.ai.organization@gmail.com.
- Social: LinkedIn, Instagram, Facebook.

RULES
- Only discuss Prism, our services, and generally-helpful context about AI for real estate and construction. Politely decline unrelated topics and steer back.
- NEVER invent specific prices, timelines, guarantees, client names, or features we didn't list. For pricing or custom scope, say it depends on their needs and recommend booking a free demo/audit or emailing us.
- If you don't know something, say so briefly and offer the demo or email.
- When relevant, end with a light, non-pushy nudge to book a demo. Do not be salesy or repetitive.`;

// ─── Friendly fallback (shown on any error or missing key) ───────────────────
const FALLBACK_REPLY =
  "Sorry, I'm having trouble right now — please email prism.ai.organization@gmail.com or book a demo.";

// ─── Dev-mode canned reply (no API key configured) ───────────────────────────
const DEV_REPLY =
  "Hi! I'm the Prism Assistant (running in dev mode — no GEMINI_API_KEY set). " +
  "In production I'll answer real questions about Prism's AI services for real estate and construction. " +
  "To enable live responses, add your GEMINI_API_KEY to .env.local (see README).";

// ─── Simple per-IP in-memory rate limiter ────────────────────────────────────
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 30; // requests per window
const ipLog = new Map(); // ip → { count, windowStart }

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipLog.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    ipLog.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= RATE_MAX) return true;
  entry.count += 1;
  return false;
}

// ─── Handler ─────────────────────────────────────────────────────────────────
export async function POST(request) {
  // Rate limiting via X-Forwarded-For (Vercel sets this)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { reply: "Too many messages — please wait a moment before trying again." },
      { status: 429 }
    );
  }

  // Parse body
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }

  // Validate payload
  const rawMessages = body?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return Response.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }
  if (rawMessages.length > 100) {
    return Response.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }

  // Sanitise: keep last 10 turns, cap each message at 2 000 chars
  const MAX_MSG_LEN = 2_000;
  const messages = rawMessages
    .slice(-10)
    .filter((m) => m && typeof m.role === "string" && typeof m.content === "string")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      content: String(m.content).slice(0, MAX_MSG_LEN),
    }));

  if (messages.length === 0) {
    return Response.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }

  // Dev fallback — no key configured
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("[chat] GEMINI_API_KEY not set — returning dev fallback.");
    return Response.json({ reply: DEV_REPLY });
  }

  // Call Gemini
  try {
    const ai = new GoogleGenAI({ apiKey });

    // Build contents array for multi-turn (role must be "user" | "model")
    const contents = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    const result = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 512,
        temperature: 0.7,
      },
    });

    const reply = result.text?.trim() || FALLBACK_REPLY;
    return Response.json({ reply });
  } catch (err) {
    // Never leak credentials or stack traces to the client
    console.error("[chat] Gemini error:", err?.message ?? err);
    return Response.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }
}
