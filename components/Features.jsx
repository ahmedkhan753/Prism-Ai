"use client";

import { motion } from "framer-motion";
import { Phone, Repeat, Plug } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const FEATURES = [
  {
    icon: Phone,
    title: "24/7 Voice Agents",
    body: "AI voice assistants that answer, qualify, and follow up with leads and clients in a natural, human-sounding voice — every hour of the day.",
    accent: "#7C3AED",
  },
  {
    icon: Repeat,
    title: "Automation & Follow-Ups",
    body: "Never lose a lead again. Automated follow-ups, reminders, and pipeline updates across email, SMS, and WhatsApp, triggered at the right moment.",
    accent: "#2563EB",
  },
  {
    icon: Plug,
    title: "Integrations & Insights",
    body: "Connects with your CRM and tools, then turns every call and message into clear next-step insights your team can act on.",
    accent: "#06B6D4",
  },
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-3xl font-semibold text-ink sm:text-4xl"
          >
            One platform. <span className="gradient-text">Less busywork.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-4 text-base text-muted sm:text-lg"
          >
            Everything you need to capture, nurture, and convert — without adding
            headcount.
          </motion.p>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {FEATURES.map(({ icon: Icon, title, body, accent }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(12,21,36,0.03)]"
            >
              {/* spectrum top border scales in on hover */}
              <span
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(90deg, ${accent}, ${accent}00)`,
                }}
              />
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${accent}14`, color: accent }}
              >
                <Icon size={22} strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
