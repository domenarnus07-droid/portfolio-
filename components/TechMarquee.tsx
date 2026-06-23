"use client";

// Drseči trak z logotipi/imeni tehnologij (neskončna zanka).
import { skills } from "@/lib/siteConfig";

export function TechMarquee() {
  const items = [...skills, ...skills]; // podvojeno za brezšivno zanko
  return (
    <div className="border-y border-border/60 bg-surface/30 py-6">
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee gap-4">
          {items.map((s, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-border bg-surface px-5 py-2 text-sm font-semibold text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
