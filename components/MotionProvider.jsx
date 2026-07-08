"use client";

import { MotionConfig } from "framer-motion";

// Global motion policy: for visitors who prefer reduced motion, Framer skips
// transform/layout animations while keeping the DOM identical (so SSR and client
// markup match — no hydration mismatch). CSS animations are additionally disabled
// in globals.css.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
