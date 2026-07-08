"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const TIERS = [
  {
    name: "Starter",
    tagline: "Your first AI wins, live in 1–2 weeks.",
    includes: [
      "Website Chatbot",
      "Lead Qualification",
      "Content Scheduler",
      "Tenant Support Bot",
    ],
    popular: false,
  },
  {
    name: "Growth",
    tagline: "Scale conversations and operations.",
    includes: [
      "AI Voice Receptionist",
      "Tour Scheduling",
      "CRM Automation & Sync",
      "Outbound Nurturing",
      "Maintenance Automation",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    tagline: "Custom AI systems for agencies & property firms.",
    includes: [
      "Full Property Management AI",
      "AI Property Valuation (AVM)",
      "Predictive Analytics",
      "Lease Abstraction AI",
      "White-Label Platform",
    ],
    popular: false,
  },
];

const gridVariants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Packages() {
  return (
    <section id="packages" className="py-20 sm:py-28">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-3xl font-semibold text-ink sm:text-4xl"
          >
            Solutions for <span className="gradient-text">every stage</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-4 text-base text-muted sm:text-lg"
          >
            Start small, scale into a full done-for-you system.
          </motion.p>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid items-start gap-6 md:grid-cols-3"
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
              className={`relative flex h-full flex-col rounded-3xl border bg-white p-7 ${
                tier.popular
                  ? "border-transparent shadow-[0_8px_30px_rgba(124,58,237,0.10)]"
                  : "border-line shadow-[0_1px_2px_rgba(12,21,36,0.03)]"
              }`}
              style={
                tier.popular
                  ? {
                      backgroundImage:
                        "linear-gradient(#fff,#fff), linear-gradient(135deg,#7C3AED,#2563EB,#06B6D4)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      borderWidth: "1.5px",
                    }
                  : undefined
              }
            >
              {tier.popular && (
                <span
                  className="absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: "linear-gradient(95deg,#7C3AED,#2563EB)" }}
                >
                  Most popular
                </span>
              )}

              <h3 className="text-xl font-semibold text-ink">{tier.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tier.tagline}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-spectrum-violet/10 text-spectrum-violet">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="text-sm text-ink/80">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`group mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${
                  tier.popular
                    ? "bg-ink text-white"
                    : "border border-line bg-white text-ink hover:bg-mist"
                }`}
              >
                Book a demo
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Flagship band */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative mt-6 overflow-hidden rounded-3xl border border-ink/10 bg-ink p-8 sm:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.40), transparent)" }}
          />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ background: "linear-gradient(95deg,#7C3AED,#2563EB,#06B6D4)" }}
              >
                Flagship
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                The All-in-One, Done-for-You System
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                We combine 5–7 services into one complete AI operation built around your
                workflow.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex flex-none items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              Book a Demo
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
