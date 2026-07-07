"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const BUSINESS_TYPES = [
  "Real Estate",
  "Construction",
  "Property Management",
  "Other",
];

export default function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to Formspree / Resend / a Next.js route handler to actually
    // deliver the enquiry. For now we just show the client-side success state.
    setSubmitted(true);
  };

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
              {submitted ? (
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
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
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

                  <button
                    type="submit"
                    className="w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Book a Demo
                  </button>
                </form>
              )}
            </div>

            <p className="mt-5 text-center text-sm text-muted">
              Prefer email? Reach us at{" "}
              <a
                href="mailto:hello@prism.ai"
                className="font-medium text-ink underline-offset-4 hover:underline"
              >
                hello@prism.ai
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
