"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PrismSignature from "@/components/PrismSignature";
import Aurora from "@/components/Aurora";
import { demoLinkProps } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const wordItem = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

function Line({ text, gradient }) {
  const ws = text.split(" ");
  return (
    <span className="block">
      {ws.map((w, i) => (
        <Fragment key={i}>
          <motion.span
            variants={wordItem}
            className={`inline-block ${gradient ? "gradient-text" : ""}`}
            style={{ willChange: "transform, opacity, filter" }}
          >
            {w}
          </motion.span>
          {i < ws.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background: drifting aurora + masked dot-grid + soft glow */}
      <Aurora variant="hero" />
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
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-container px-5 text-center sm:px-8"
      >
        <motion.div variants={item} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-xs font-medium text-muted shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full spectrum-bg" />
            Built for Real Estate &amp; Construction
          </span>
        </motion.div>

        <motion.h1
          variants={wordContainer}
          className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] text-ink sm:text-6xl"
        >
          <Line text="Automate the busywork." />
          <Line text="Close more deals." gradient />
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
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-spectrum-violet/20 transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 spectrum-bg"
            />
            <span className="relative">Book a Demo</span>
            <ArrowRight
              size={17}
              className="relative transition-transform duration-200 group-hover:translate-x-0.5"
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
