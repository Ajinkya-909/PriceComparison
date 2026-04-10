export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Magnifying Glass */}
      <circle cx="20" cy="18" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M26 24l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Left price house - Red */}
      <path
        d="M8 28v-8h4v8M6 20h6v-4h-2v-2h4v6h2"
        fill="currentColor"
        className="text-red-500"
      />

      {/* Right price house - Green */}
      <path
        d="M32 28v-8h4v8m-6-8h6v-4h-2v-2h4v6h2"
        fill="currentColor"
        className="text-green-500"
      />

      {/* VS badge */}
      <rect x="16" y="24" width="8" height="6" rx="1" fill="currentColor" className="text-blue-500" />
      <text
        x="20"
        y="28"
        textAnchor="middle"
        fill="white"
        className="text-xs font-bold"
        dominantBaseline="middle"
      >
        VS
      </text>

      {/* Shopping cart in magnifying glass */}
      <path
        d="M18 16l1-2h2l-1 2"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
