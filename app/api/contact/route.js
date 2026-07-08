import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot — accept silently, send nothing.
  if (body.botcheck) {
    return Response.json({ ok: true });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const company = String(body.company || "").trim();
  const businessType = String(body.businessType || body.business_type || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  // Dev fallback: no creds configured → log and succeed so local builds/tests pass.
  if (!user || !pass) {
    console.log("[contact] (no SMTP creds — dev fallback) enquiry:", {
      name,
      email,
      company,
      businessType,
      message,
    });
    return Response.json({ ok: true, dev: true });
  }

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Business type", businessType || "—"],
    ["Message", message || "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
    <div style="font-family:Inter,Segoe UI,system-ui,sans-serif;color:#0C1524;line-height:1.6">
      <h2 style="margin:0 0 12px">New Prism enquiry</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#5B6472;vertical-align:top">${k}</td><td style="padding:4px 0">${esc(
                v
              ).replace(/\n/g, "<br/>")}</td></tr>`
          )
          .join("")}
      </table>
    </div>`;

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transport.sendMail({
      from: `Prism Website <${user}>`,
      to: user,
      replyTo: email,
      subject: `New Prism enquiry — ${name}`,
      text,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    // Never leak the stack trace to the client.
    console.error("[contact] sendMail failed:", err?.message || err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
