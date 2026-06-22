"use client";

// Sekcija "Pot" — časovnica izkušenj/projektov.
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function Timeline() {
  const { t } = useI18n();
  return (
    <Section id="path">
      <div className="container-px">
        <SectionHeading eyebrow={t.timeline.eyebrow} title={t.timeline.title} />
        <ol className="relative ml-3 border-l border-border">
          {t.timeline.items.map((item, i) => (
            <li key={i} className="mb-10 ml-6 last:mb-0">
              {/* Pika na črti */}
              <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-bg bg-primary" />
              <p className="text-sm font-semibold text-accent">{item.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
