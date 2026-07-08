"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const word = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE },
  },
};

// Heading whose words fade + rise + un-blur one after another on view.
// `parts` is an array of { text, gradient? } segments; gradient segments get the
// shimmering spectrum treatment. Real space text nodes separate every word so the
// heading stays selectable, wrappable, and screen-reader friendly. Under
// prefers-reduced-motion the global MotionConfig neutralizes the transforms while
// the DOM stays identical (no hydration mismatch).
export default function AnimatedHeading({
  parts,
  as = "h2",
  className = "",
  align = "left",
}) {
  const MotionTag = motion[as] || motion.h2;

  const words = [];
  parts.forEach((part, pi) => {
    part.text.split(" ").forEach((w, wi) => {
      if (w) words.push({ w, gradient: part.gradient, key: `${pi}-${wi}` });
    });
  });

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      style={{ textAlign: align }}
    >
      {words.map(({ w, gradient, key }, idx) => (
        <Fragment key={key}>
          <motion.span
            variants={word}
            className={`inline-block ${gradient ? "gradient-text" : ""}`}
            style={{ willChange: "transform, opacity, filter" }}
          >
            {w}
          </motion.span>
          {idx < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </MotionTag>
  );
}
