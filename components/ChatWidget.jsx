"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RotateCcw, ChevronRight } from "lucide-react";
import Logo from "@/components/Logo";

// ─── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "prism_chat";
const CHAT_ENDPOINT = "/api/chat";

const GREETING = {
  id: "greeting",
  role: "assistant",
  content:
    "Hi! I'm the Prism assistant. Ask me about our AI services for real estate & construction — or book a demo anytime. 👋",
};

const CHIPS = [
  "What services do you offer?",
  "How does it work?",
  "Do you work with construction firms?",
  "Book a demo",
];

// ─── Motion variants ──────────────────────────────────────────────────────────
const panelVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 20,
    transformOrigin: "bottom right",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transformOrigin: "bottom right",
    transition: { type: "spring", stiffness: 380, damping: 32, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: 16,
    transformOrigin: "bottom right",
    transition: { duration: 0.18, ease: [0.32, 0, 0.67, 0] },
  },
};

const bubbleVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
};

const pulseVariants = {
  idle: {
    scale: [1, 1.07, 1],
    transition: {
      duration: 2.8,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 1.5,
    },
  },
};

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-1 px-4 py-3"
      aria-label="Assistant is typing"
      role="status"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-muted/60"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
function Bubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <span className="mr-2 mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-line bg-white shadow-sm">
          <Logo size={14} />
        </span>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-tr-sm bg-ink text-white"
            : "rounded-tl-sm border border-line bg-mist text-ink"
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const inputId = useId();

  // ── State ──
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  // ── Hydrate from localStorage ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { open, msgs } = JSON.parse(saved);
        if (Array.isArray(msgs) && msgs.length > 0) setMessages(msgs);
        if (typeof open === "boolean") setIsOpen(open);
      }
    } catch {
      // silently ignore parse errors
    }
    setHydrated(true);
  }, []);

  // ── Persist to localStorage ──
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ open: isOpen, msgs: messages })
      );
    } catch {
      // storage quota exceeded — ignore
    }
  }, [isOpen, messages, hydrated]);

  // ── Auto-scroll ──
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSending, isOpen]);

  // ── Focus input on open ──
  useEffect(() => {
    if (isOpen) {
      // Small delay so the panel animation starts first
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ── Focus trap ──
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    []
  );

  // ── Send message ──
  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text ?? input).trim();
      if (!trimmed || isSending) return;

      const userMsg = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsSending(true);

      try {
        // Build conversation history for the API (exclude the greeting)
        const history = [...messages, userMsg]
          .filter((m) => m.id !== "greeting")
          .map(({ role, content }) => ({
            role: role === "assistant" ? "assistant" : "user",
            content,
          }));

        const res = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        const { reply } = await res.json().catch(() => ({}));
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content:
              reply ||
              "Sorry, I'm having trouble right now — please email prism.ai.organization@gmail.com or book a demo.",
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-err-${Date.now()}`,
            role: "assistant",
            content:
              "Sorry, I'm having trouble right now — please email prism.ai.organization@gmail.com or book a demo.",
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [input, isSending, messages]
  );

  // ── Chip click ──
  const onChipClick = useCallback(
    (chip) => {
      if (chip === "Book a demo") {
        setIsOpen(false);
        const el = document.getElementById("contact");
        el?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      sendMessage(chip);
    },
    [sendMessage]
  );

  // ── Clear chat ──
  const clearChat = useCallback(() => {
    setMessages([GREETING]);
    setInput("");
  }, []);

  // ── Book a demo link ──
  const goToDemo = useCallback(() => {
    setIsOpen(false);
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Determine if chips should show (no user messages yet)
  const hasUserMessages = messages.some((m) => m.role === "user");

  // Don't render on server (SSR) to avoid hydration mismatch from localStorage
  if (!hydrated) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            key="chat-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Prism Assistant chat"
            onKeyDown={handleKeyDown}
            className={[
              // Desktop: fixed size from bottom-right
              "fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-[380px]",
              // Height: near-fullscreen on mobile, fixed on desktop
              "h-[calc(100vh-7rem)] sm:h-[560px]",
              // Visual
              "flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-ink/10",
            ].join(" ")}
          >
            {/* ── Header ── */}
            <div className="relative flex-none border-b border-line">
              {/* Spectrum accent line at very bottom of header */}
              <div
                className="absolute bottom-0 inset-x-0 h-[2px] spectrum-bg opacity-80"
                aria-hidden="true"
              />
              <div className="flex items-center gap-3 px-4 py-3.5">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line bg-mist">
                  <Logo size={18} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink leading-tight font-display">
                    Prism Assistant
                  </p>
                  <p className="text-xs text-muted leading-tight">
                    Ask about our services
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {/* Clear chat */}
                  <button
                    onClick={clearChat}
                    title="Clear chat"
                    aria-label="Clear chat history"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-mist hover:text-ink"
                  >
                    <RotateCcw size={15} strokeWidth={2} />
                  </button>
                  {/* Close */}
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-mist hover:text-ink"
                  >
                    <X size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
              aria-live="polite"
              aria-atomic="false"
              aria-relevant="additions"
            >
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <Bubble key={msg.id} msg={msg} />
                ))}

                {/* Typing indicator */}
                {isSending && (
                  <div className="flex justify-start">
                    <span className="mr-2 mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-line bg-white shadow-sm">
                      <Logo size={14} />
                    </span>
                    <div className="rounded-2xl rounded-tl-sm border border-line bg-mist">
                      <TypingIndicator />
                    </div>
                  </div>
                )}

                {/* Suggestion chips (shown before any user message) */}
                {!hasUserMessages && !isSending && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {CHIPS.map((chip) => (
                      <button
                        key={chip}
                        onClick={() => onChipClick(chip)}
                        className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-sm transition-all hover:border-spectrum-blue/60 hover:bg-mist hover:text-spectrum-blue"
                      >
                        {chip}
                        <ChevronRight size={11} className="opacity-50" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} aria-hidden="true" />
            </div>

            {/* ── Book a Demo link ── */}
            <div className="flex-none border-t border-line/60 bg-mist/50 px-4 py-2">
              <button
                onClick={goToDemo}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold text-spectrum-violet transition-colors hover:text-spectrum-blue"
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full spectrum-bg"
                  aria-hidden="true"
                />
                Book a Free Demo
                <ChevronRight size={12} className="opacity-70" />
              </button>
            </div>

            {/* ── Input Row ── */}
            <div className="flex-none border-t border-line bg-white px-3 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-end gap-2"
              >
                <label htmlFor={inputId} className="sr-only">
                  Message Prism Assistant
                </label>
                <textarea
                  id={inputId}
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask a question…"
                  disabled={isSending}
                  aria-label="Message Prism Assistant"
                  className={[
                    "flex-1 resize-none rounded-xl border border-line bg-mist px-3.5 py-2.5",
                    "text-sm text-ink placeholder:text-muted/60",
                    "transition-colors focus:border-spectrum-blue focus:outline-none",
                    "max-h-28 min-h-[42px]",
                    "disabled:opacity-50",
                  ].join(" ")}
                  style={{ fieldSizing: "content" }}
                />
                <button
                  type="submit"
                  disabled={isSending || !input.trim()}
                  aria-label="Send message"
                  className={[
                    "flex h-[42px] w-[42px] flex-none items-center justify-center rounded-xl",
                    "bg-ink text-white shadow-sm transition-all",
                    "hover:scale-105 hover:shadow-md",
                    "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100",
                  ].join(" ")}
                >
                  <Send size={16} strokeWidth={2} />
                </button>
              </form>
              <p className="mt-1.5 text-center text-[10px] text-muted/50">
                Prism AI · may make mistakes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Button ── */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        variants={pulseVariants}
        animate={isOpen ? "idle" : "idle"}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={[
          "relative flex h-16 w-16 items-center justify-center rounded-full",
          "border border-line bg-white shadow-xl shadow-ink/15",
          "transition-transform duration-200 hover:scale-110",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spectrum-blue",
        ].join(" ")}
      >
        {/* Soft spectrum glow layer */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full opacity-60 blur-xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(124,58,237,0.25), rgba(37,99,235,0.15), rgba(6,182,212,0.08), transparent)",
          }}
        />
        {/* Slow pulse ring */}
        {!isOpen && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-spectrum-violet/30"
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              repeatDelay: 0.8,
            }}
          />
        )}
        <span className="relative z-10">
          <Logo size={28} />
        </span>
      </motion.button>
    </div>
  );
}
