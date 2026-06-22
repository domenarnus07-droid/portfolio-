// Majhna značka za tehnologije.
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs font-medium text-muted">
      {children}
    </span>
  );
}
