// Soft, slowly-drifting spectrum glows for section backgrounds. Purely decorative
// and non-interactive; the drift animation is disabled under prefers-reduced-motion
// (globals.css). Keep opacity low so the white brand stays clean.
const BLOBS = {
  hero: [
    { c: "rgba(124,58,237,0.28)", w: 460, h: 460, top: "-6%", left: "12%", delay: "0s" },
    { c: "rgba(37,99,235,0.24)", w: 420, h: 420, top: "0%", left: "58%", delay: "-6s" },
    { c: "rgba(6,182,212,0.20)", w: 380, h: 380, top: "34%", left: "36%", delay: "-11s" },
  ],
  soft: [
    { c: "rgba(124,58,237,0.16)", w: 420, h: 420, top: "-20%", left: "-4%", delay: "0s" },
    { c: "rgba(6,182,212,0.14)", w: 400, h: 400, top: "10%", left: "72%", delay: "-8s" },
  ],
  warm: [
    { c: "rgba(245,158,11,0.14)", w: 380, h: 380, top: "-10%", left: "6%", delay: "-3s" },
    { c: "rgba(124,58,237,0.18)", w: 440, h: 440, top: "0%", left: "66%", delay: "-9s" },
  ],
};

export default function Aurora({ variant = "soft", className = "" }) {
  const blobs = BLOBS[variant] || BLOBS.soft;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {blobs.map((b, i) => (
        <span
          key={i}
          className="aurora-blob absolute rounded-full blur-3xl"
          style={{
            width: b.w,
            height: b.h,
            top: b.top,
            left: b.left,
            background: `radial-gradient(closest-side, ${b.c}, transparent)`,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
