"use client";

import { motion } from "framer-motion";
import { Target, UserCheck, BellRing, MessagesSquare } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const ITEMS = [
  {
    icon: Target,
    title: "Lead Qualification",
    body: "Every inbound lead scored and routed automatically.",
  },
  {
    icon: UserCheck,
    title: "Human Oversight",
    body: "You review, approve, and guide the AI in real time.",
  },
  {
    icon: BellRing,
    title: "Smart Alerts",
    body: "Flags stalled deals and drop-offs before they cost you.",
  },
  {
    icon: MessagesSquare,
    title: "Conversation Intelligence",
    body: "Transcripts with intent and next-step summaries.",
  },
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Highlights() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 rounded-3xl border border-line bg-mist p-8 sm:grid-cols-2 sm:p-12 lg:grid-cols-4"
        >
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} variants={itemVariants}>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-white text-ink">
                <Icon size={20} strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
