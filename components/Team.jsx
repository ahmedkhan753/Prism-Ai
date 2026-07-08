"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { TEAM, externalLinkProps } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1];

function initials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const gridVariants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Team() {
  return (
    <section id="team" className="py-20 sm:py-28">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-3xl font-semibold text-ink sm:text-4xl"
          >
            The team building <span className="gradient-text">Prism</span>
          </motion.h2>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2"
        >
          {TEAM.map((member, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex flex-col items-center rounded-3xl border border-line bg-white p-8 text-center shadow-[0_1px_2px_rgba(12,21,36,0.03)]"
            >
              {/* avatar with spectrum accent ring */}
              <div
                className="rounded-full p-[3px]"
                style={{ background: "linear-gradient(135deg,#7C3AED,#2563EB,#06B6D4,#F59E0B)" }}
              >
                <div className="rounded-full bg-white p-1">
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-mist font-display text-2xl font-semibold text-muted">
                      {initials(member.name)}
                    </div>
                  )}
                </div>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-ink">{member.name}</h3>
              <p className="mt-0.5 text-sm font-medium text-spectrum-blue">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>

              {member.linkedin && (
                <a
                  {...externalLinkProps(member.linkedin)}
                  aria-label={`${member.name} on LinkedIn`}
                  className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-spectrum-blue hover:text-spectrum-blue"
                >
                  <Linkedin size={17} strokeWidth={2} />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
