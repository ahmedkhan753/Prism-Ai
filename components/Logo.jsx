// Prism logo mark: a dark triangular prism with four rounded spectrum beams
// (violet, blue, cyan, amber) dispersing from the apex. Size-parameterized.
export default function Logo({ size = 26, className = "", title = "Prism" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      <path d="M50 47 L26 85 L74 85 Z" fill="#0C1524" />
      <g strokeLinecap="round" strokeWidth="8" fill="none">
        <line x1="50" y1="47" x2="31" y2="16" stroke="#7C3AED" />
        <line x1="50" y1="47" x2="43" y2="9" stroke="#2563EB" />
        <line x1="50" y1="47" x2="57" y2="9" stroke="#06B6D4" />
        <line x1="50" y1="47" x2="69" y2="16" stroke="#F59E0B" />
      </g>
    </svg>
  );
}
