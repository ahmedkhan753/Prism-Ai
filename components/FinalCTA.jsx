"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1];

// Same-origin route handler (Nodemailer over the client's Gmail SMTP).
const CONTACT_ENDPOINT = "/api/contact";

const BUSINESS_TYPES = [
  "Real Estate",
  "Construction",
  "Property Management",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FinalCTA() {
  // idle | loading | success | error
  const [status, setStatus] = useState("idle");
  const [validationMsg, setValidationMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: if a bot filled the hidden field, pretend success and drop it.
    if (data.get("botcheck")) {
      setStatus("success");
      return;
    }

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const businessType = String(data.get("businessType") || "").trim();
    const message = String(data.get("message") || "").trim();

    // Validate before send.
    if (!name) {
      setValidationMsg("Please enter your name.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setValidationMsg("Please enter a valid work email.");
      return;
    }
    setValidationMsg("");

    setStatus("loading");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          businessType,
          message,
          botcheck: "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const loading = status === "loading";

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-mist px-6 py-14 sm:px-12">
          {/* soft top glow */}
          <div
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-3/4 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(124,58,237,0.16), rgba(37,99,235,0.10), transparent)",
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-muted"
            >
              Get started
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
              className="mt-5 text-3xl font-semibold text-ink sm:text-4xl"
            >
              Ready to put <span className="gradient-text">AI to work?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
              className="mt-4 text-base text-muted"
            >
              Tell us about your business and we&rsquo;ll show you exactly where AI
              can save time and win more deals — book a demo or claim a free audit.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            className="relative mx-auto mt-10 max-w-xl"
          >
            <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(12,21,36,0.04)] sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-spectrum-violet/10 text-spectrum-violet">
                    <Check size={26} strokeWidth={2.5} />
                  </span>
                  <p className="mt-5 text-lg font-semibold text-ink">
                    Thanks — we&rsquo;ll be in touch shortly.
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    A member of the Prism team will reach out to schedule your demo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
                  {/* Honeypot — hidden from humans, catches bots. */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" htmlFor="name">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className={inputClass}
                        placeholder="Jordan Rivera"
                      />
                    </Field>
                    <Field label="Work email" htmlFor="email">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={inputClass}
                        placeholder="you@company.com"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Company" htmlFor="company">
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        className={inputClass}
                        placeholder="Company name"
                      />
                    </Field>
                    <Field label="Business type" htmlFor="businessType">
                      <select
                        id="businessType"
                        name="businessType"
                        defaultValue="Real Estate"
                        className={`${inputClass} appearance-none bg-white`}
                      >
                        {BUSINESS_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field
                    label="What would you like to automate?"
                    htmlFor="message"
                  >
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={`${inputClass} resize-none`}
                      placeholder="Lead follow-ups, after-hours calls, CRM updates…"
                    />
                  </Field>

                  {validationMsg && (
                    <p className="text-sm text-red-500" role="alert">
                      {validationMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {loading ? "Sending…" : "Book a Demo"}
                  </button>

                  {status === "error" && (
                    <p className="text-center text-sm text-red-500" role="alert">
                      Something went wrong — email us at{" "}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="font-medium underline underline-offset-2"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </p>
                  )}
                </form>
              )}
            </div>

            <p className="mt-5 text-center text-sm text-muted">
              Prefer email? Reach us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-ink underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-spectrum-blue";

function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
