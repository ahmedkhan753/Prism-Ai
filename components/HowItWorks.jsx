"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "@/components/AnimatedHeading";

const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    n: 1,
    title: "Free AI Audit",
    body: "We map your workflow and pinpoint the highest-impact automations.",
  },
  {
    n: 2,
    title: "Build & Integrate",
    body: "We build the agents and connect them to your tools and CRM.",
  },
  {
    n: 3,
    title: "Human-Guided Launch",
    body: "Your AI goes live while you review, approve, and coach it.",
  },
];

function Connector({ delay }) {
  return (
    <motion.div
      aria-hidden="true"
      className="mx-2 hidden h-px flex-1 origin-left md:mt-7 md:block"
      style={{ background: "linear-gradient(90deg,#7C3AED,#2563EB,#06B6D4)" }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    />
  );
}

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <AnimatedHeading
            align="center"
            className="text-3xl font-semibold text-ink sm:text-4xl"
            parts={[{ text: "Live in" }, { text: "days, not months.", gradient: true }]}
          />
        </div>

        <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-start md:gap-0">
          {STEPS.map((step, i) => (
            <div key={step.n} className="flex flex-1 flex-col md:flex-row md:items-start">
              <div className="flex-1 text-center md:px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 + i * 0.15 }}
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#7C3AED,#2563EB)" }}
                >
                  {step.n}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.15 }}
                  className="mt-5 text-lg font-semibold text-ink"
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.28 + i * 0.15 }}
                  className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-muted"
                >
                  {step.body}
                </motion.p>
              </div>
              {i < STEPS.length - 1 && <Connector delay={0.35 + i * 0.15} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
