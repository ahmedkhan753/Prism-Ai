"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "@/components/AnimatedHeading";
import {
  PhoneCall,
  MessageCircle,
  Filter,
  CalendarCheck,
  RefreshCw,
  Wrench,
  PenLine,
  Star,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    icon: PhoneCall,
    name: "AI Voice Receptionist",
    body: "Answers inbound calls, pre-qualifies, and books viewings straight into your CRM.",
    accent: "#7C3AED",
    feature: true,
    span: "lg:col-span-2 lg:row-span-2 md:col-span-2",
  },
  {
    icon: MessageCircle,
    name: "Website & WhatsApp Chatbot",
    body: "24/7 answers to property questions; captures every visitor's details.",
    accent: "#2563EB",
    span: "lg:col-span-2",
  },
  {
    icon: Filter,
    name: "Automated Lead Qualification",
    body: "Scores and routes leads Hot / Warm / Cold the moment they arrive.",
    accent: "#06B6D4",
    span: "lg:col-span-2",
  },
  {
    icon: CalendarCheck,
    name: "Tour & Viewing Scheduling",
    body: "Checks your calendar, books showings, sends reminders automatically.",
    accent: "#F59E0B",
    span: "lg:col-span-1",
  },
  {
    icon: RefreshCw,
    name: "CRM Automation & Sync",
    body: "Every call and message logged and updated — no manual data entry.",
    accent: "#7C3AED",
    span: "lg:col-span-1",
  },
  {
    icon: Wrench,
    name: "Maintenance & Tenant Support",
    body: "Routes tenant requests to the right contractor, automatically.",
    accent: "#2563EB",
    span: "lg:col-span-2",
  },
  {
    icon: PenLine,
    name: "Listing & Content Generation",
    body: "Professional listing descriptions and social posts in seconds.",
    accent: "#06B6D4",
    span: "lg:col-span-2",
  },
  {
    icon: Star,
    name: "Automated Review Generation",
    body: "Requests and follows up for Google / Facebook reviews on autopilot.",
    accent: "#F59E0B",
    span: "lg:col-span-2",
  },
];

const gridVariants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="max-w-2xl">
          <AnimatedHeading
            className="text-3xl font-semibold text-ink sm:text-4xl"
            parts={[
              { text: "Built for" },
              { text: "real estate & construction", gradient: true },
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-4 text-base text-muted sm:text-lg"
          >
            Pick what you need today — add more as you grow.
          </motion.p>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[176px]"
        >
          {SERVICES.map(({ icon: Icon, name, body, accent, feature, span }) => (
            <motion.div
              key={name}
              variants={tileVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(12,21,36,0.03)] ${span}`}
            >
              {/* soft spectrum glow on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(closest-side, ${accent}40, transparent)` }}
              />
              {/* spectrum bottom accent line */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, ${accent}, ${accent}00)` }}
              />

              <span
                className={`relative inline-flex items-center justify-center rounded-2xl ${
                  feature ? "h-14 w-14" : "h-11 w-11"
                }`}
                style={{ backgroundColor: `${accent}14`, color: accent }}
              >
                <Icon size={feature ? 26 : 20} strokeWidth={2} />
              </span>

              <div className="relative mt-auto pt-5">
                <h3
                  className={`font-semibold text-ink ${feature ? "text-xl" : "text-base"}`}
                >
                  {name}
                </h3>
                <p
                  className={`mt-2 leading-relaxed text-muted ${
                    feature ? "text-sm sm:text-base" : "text-sm"
                  }`}
                >
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
