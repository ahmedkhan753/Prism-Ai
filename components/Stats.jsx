"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";

const EASE = [0.22, 1, 0.36, 1];

const STATS = [
  { to: 24, prefix: "", suffix: "/7", label: "availability" },
  { to: 1, prefix: "< ", suffix: " min", label: "response time" },
  { to: 3, prefix: "", suffix: "×", label: "faster follow-up" },
];

export default function Stats() {
  return (
    <section className="pb-4 pt-2 sm:pb-8">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-1 divide-y divide-line rounded-3xl border border-line bg-mist py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-6 text-center">
              <div className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                <span className="gradient-text">
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
