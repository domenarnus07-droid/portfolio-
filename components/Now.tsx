"use client";

// Sekcija "Trenutno gradim" — na čem trenutno delam.
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function Now() {
  const { t } = useI18n();
  return (
    <Section id="now">
      <div className="container-px">
        <SectionHeading eyebrow={t.now.eyebrow} title={t.now.title} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.now.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5"
            >
              <span className="mt-1 flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <p className="text-sm leading-relaxed text-muted">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
