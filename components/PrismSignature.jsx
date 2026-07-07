// Ambient prism-refraction graphic: a white beam enters a triangular prism
// and disperses into the 4-color Prism spectrum. Subtle, not loud.
export default function PrismSignature({ className = "" }) {
  return (
    <svg
      viewBox="0 0 520 260"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="beam-in" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0C1524" stopOpacity="0" />
          <stop offset="1" stopColor="#0C1524" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="prism-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0C1524" stopOpacity="0.9" />
          <stop offset="1" stopColor="#1c2740" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="prism-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7C3AED" stopOpacity="0.18" />
          <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft ambient glow behind the prism */}
      <circle cx="250" cy="130" r="140" fill="url(#prism-glow)" />

      {/* incoming white beam */}
      <line
        x1="40"
        y1="130"
        x2="230"
        y2="130"
        stroke="url(#beam-in)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* dispersed spectrum, fanning out from the prism's right face */}
      <g strokeWidth="3" strokeLinecap="round" fill="none">
        <line x1="270" y1="112" x2="480" y2="72" stroke="#7C3AED" opacity="0.85" />
        <line x1="272" y1="124" x2="486" y2="110" stroke="#2563EB" opacity="0.85" />
        <line x1="272" y1="136" x2="486" y2="150" stroke="#06B6D4" opacity="0.85" />
        <line x1="270" y1="148" x2="480" y2="188" stroke="#F59E0B" opacity="0.85" />
      </g>

      {/* the prism */}
      <path
        d="M250 70 L214 170 L286 170 Z"
        fill="url(#prism-face)"
        stroke="#E7EAF0"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
    </svg>
  );
}
