// Logo "DA | DOMEN ARNUS" — prilagodi se temi (bel na temni, moder na svetli).
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-fg ${className}`}>
      {/* Monogram DA (serif) */}
      <span
        className="text-2xl font-bold leading-none tracking-tight"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        DA
      </span>
      {/* Ločnica */}
      <span className="h-7 w-px bg-current opacity-30" aria-hidden="true" />
      {/* Ime */}
      <span className="flex flex-col text-[0.6rem] font-semibold uppercase leading-tight tracking-[0.25em]">
        <span>Domen</span>
        <span>Arnuš</span>
      </span>
    </span>
  );
}
