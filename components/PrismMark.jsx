export default function PrismMark({ size = 32, className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M50 44 L27 84 L73 84 Z" fill="#0C1524" />
      <g strokeLinecap="round" strokeWidth="5" fill="none">
        <line x1="50" y1="44" x2="33" y2="15" stroke="#7C3AED" />
        <line x1="50" y1="44" x2="44" y2="9" stroke="#2563EB" />
        <line x1="50" y1="44" x2="56" y2="9" stroke="#06B6D4" />
        <line x1="50" y1="44" x2="67" y2="15" stroke="#F59E0B" />
      </g>
    </svg>
  );
}
