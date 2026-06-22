// Maskot — prijazen robot v brand barvah (modra + oranžna).
// SVG, da je oster na vseh velikostih. Zamenjaj po želji.
export function Mascot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label="Maskot — robot"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(var(--color-primary))" />
          <stop offset="1" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1220" />
          <stop offset="1" stopColor="#111a30" />
        </linearGradient>
      </defs>

      {/* Antena */}
      <line x1="120" y1="34" x2="120" y2="58" stroke="rgb(var(--color-primary))" strokeWidth="6" strokeLinecap="round" />
      <circle cx="120" cy="28" r="10" fill="rgb(var(--color-accent))">
        <animate attributeName="r" values="9;11;9" dur="1.8s" repeatCount="indefinite" />
      </circle>

      {/* Ušesa */}
      <rect x="34" y="104" width="16" height="44" rx="8" fill="rgb(var(--color-accent))" />
      <rect x="190" y="104" width="16" height="44" rx="8" fill="rgb(var(--color-accent))" />

      {/* Glava */}
      <rect x="48" y="58" width="144" height="132" rx="32" fill="url(#body)" />
      {/* Zaslon (obraz) */}
      <rect x="66" y="78" width="108" height="78" rx="22" fill="url(#screen)" />

      {/* Oči */}
      <circle cx="100" cy="116" r="11" fill="#7dd3fc">
        <animate attributeName="opacity" values="1;0.2;1" dur="4s" begin="0s" repeatCount="indefinite" keyTimes="0;0.04;0.08" />
      </circle>
      <circle cx="140" cy="116" r="11" fill="#7dd3fc">
        <animate attributeName="opacity" values="1;0.2;1" dur="4s" begin="0s" repeatCount="indefinite" keyTimes="0;0.04;0.08" />
      </circle>

      {/* Nasmeh */}
      <path d="M102 134 q18 14 36 0" fill="none" stroke="rgb(var(--color-accent))" strokeWidth="5" strokeLinecap="round" />

      {/* Telo / podstavek */}
      <rect x="84" y="190" width="72" height="20" rx="10" fill="rgb(var(--color-primary))" opacity="0.9" />
    </svg>
  );
}
