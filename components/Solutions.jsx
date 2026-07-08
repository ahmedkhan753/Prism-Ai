"use client";

import { motion } from "framer-motion";
import { MessagesSquare, Workflow, Sparkles } from "lucide-react";
import AnimatedHeading from "@/components/AnimatedHeading";

const EASE = [0.22, 1, 0.36, 1];

const PILLARS = [
  {
    icon: MessagesSquare,
    title: "Conversations that convert",
    body: "AI voice receptionists and website chatbots that answer, qualify, and book viewings 24/7 — in a natural, human voice.",
    accent: "#7C3AED",
  },
  {
    icon: Workflow,
    title: "Operations on autopilot",
    body: "Tour scheduling, maintenance requests, CRM sync and follow-ups handled end-to-end, so nothing slips.",
    accent: "#2563EB",
  },
  {
    icon: Sparkles,
    title: "Intelligence that compounds",
    body: "Property valuations, predictive analytics and conversation insights that turn your data into decisions.",
    accent: "#06B6D4",
  },
];

const gridVariants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Solutions() {
  return (
    <section id="solutions" className="py-20 sm:py-24">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="max-w-2xl">
          <AnimatedHeading
            className="text-3xl font-semibold text-ink sm:text-4xl"
            parts={[
              { text: "Everything your front office does —" },
              { text: "automated.", gradient: true },
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-4 text-base text-muted sm:text-lg"
          >
            Three systems working together, with your team in control.
          </motion.p>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {PILLARS.map(({ icon: Icon, title, body, accent }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(12,21,36,0.03)]"
            >
              <span
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, ${accent}, ${accent}00)` }}
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
