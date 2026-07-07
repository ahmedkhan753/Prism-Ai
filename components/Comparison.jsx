"use client";

import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const OLD_WAY = [
  "Manual, easy-to-forget follow-ups",
  "Missed calls after hours",
  "Leads slipping through the cracks",
  "Generic, one-size call scripts",
  "Hours lost to data entry",
  "Slow response times",
];

const WITH_PRISM = [
  "Automated follow-ups on every lead",
  "Answered, qualified, 24/7",
  "Every enquiry captured and logged",
  "Natural, context-aware conversations",
  "Records synced to your CRM",
  "Instant, first-minute responses",
];

function Card({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Comparison() {
  return (
    <section id="compare" className="py-20 sm:py-28">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-3xl font-semibold text-ink sm:text-4xl"
          >
            The difference is in the{" "}
            <span className="gradient-text">follow-through</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-4 text-base text-muted sm:text-lg"
          >
            Not another chatbot or static tool — a system that actually runs the work.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Old way */}
          <Card className="rounded-3xl border border-line bg-white p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              The old way
            </h3>
            <ul className="mt-6 space-y-4">
              {OLD_WAY.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-red-50 text-red-500">
                    <X size={13} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* With Prism */}
          <Card className="relative overflow-hidden rounded-3xl border border-ink/10 bg-ink p-8">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.35), transparent)" }}
              aria-hidden="true"
            />
            <h3 className="relative text-sm font-semibold uppercase tracking-wide text-white/70">
              With Prism
            </h3>
            <ul className="relative mt-6 space-y-4">
              {WITH_PRISM.map((item, i) => {
                const accents = ["#7C3AED", "#2563EB", "#06B6D4", "#F59E0B"];
                const accent = accents[i % accents.length];
                return (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full"
                      style={{ backgroundColor: `${accent}26`, color: accent }}
                    >
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="text-sm text-white/90">{item}</span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-spectrum-blue"
          >
            Get a free AI audit for your business
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
