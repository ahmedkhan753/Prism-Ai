"use client";

import { motion } from "framer-motion";

// Hero centerpiece — matches the logo mark: a dark triangular prism at the base
// with four spectrum rays rising and fanning slightly upward. Rays draw on load,
// then shimmer gently; the whole mark floats slowly. Under prefers-reduced-motion
// the global MotionConfig neutralizes the transform (float) while the rays still
// resolve to full opacity — DOM stays identical, so no hydration mismatch.
const RAYS = [
  { d: "M100 96 L64 20", color: "#7C3AED" },
  { d: "M100 96 L86 8", color: "#2563EB" },
  { d: "M100 96 L114 8", color: "#06B6D4" },
  { d: "M100 96 L136 20", color: "#F59E0B" },
];

const EASE = [0.22, 1, 0.36, 1];

export default function PrismSignature({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* soft radial glow behind the mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,58,237,0.20), rgba(37,99,235,0.12), transparent)",
        }}
      />

      <motion.svg
        viewBox="0 0 200 200"
        className="relative mx-auto w-[220px] max-w-full sm:w-[260px]"
        fill="none"
        role="img"
        aria-label="Prism refraction mark"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        {/* rising spectrum rays */}
        <g strokeWidth="9" strokeLinecap="round" fill="none">
          {RAYS.map((ray, i) => (
            <motion.path
              key={ray.color}
              d={ray.d}
              stroke={ray.color}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: [0, 1, 0.72, 1] }}
              viewport={{ once: true }}
              transition={{
                pathLength: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 },
                opacity: {
                  duration: 3,
                  ease: "easeInOut",
                  delay: 0.15 + i * 0.12,
                  repeat: Infinity,
                  repeatType: "mirror",
                  times: [0, 0.3, 0.65, 1],
                },
              }}
            />
          ))}
        </g>

        {/* the prism (triangle base) */}
        <motion.path
          d="M100 96 L54 172 L146 172 Z"
          fill="#0C1524"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ transformOrigin: "100px 130px" }}
        />
      </motion.svg>
    </div>
  );
}
