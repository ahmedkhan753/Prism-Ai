"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PrismSignature from "@/components/PrismSignature";
import { demoLinkProps } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background: dot-grid with radial mask + soft glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0 dot-grid"
          style={{
            maskImage:
              "radial-gradient(120% 90% at 50% 30%, #000 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(120% 90% at 50% 30%, #000 20%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(124,58,237,0.14), rgba(37,99,235,0.10), transparent)",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-container px-5 text-center sm:px-8"
      >
        <motion.div variants={item} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-spectrum-violet" />
            Built for Real Estate &amp; Construction
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] text-ink sm:text-6xl"
        >
          Automate the busywork.
          <br />
          <span className="gradient-text">Close more deals.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Prism builds AI voice agents, follow-up automation, and insights for real
          estate and construction teams — capturing every lead and handling client
          calls around the clock, with your team in control.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            {...demoLinkProps()}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
          >
            Book a Demo
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#solutions"
            className="inline-flex w-full items-center justify-center rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-mist sm:w-auto"
          >
            See how it works
          </a>
        </motion.div>

        <motion.div variants={item} className="mx-auto mt-14 w-full max-w-[520px]">
          <PrismSignature className="w-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
