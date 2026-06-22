// Sekcija "Pot" — časovnica izkušenj/projektov.
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { timeline } from "@/lib/siteConfig";

export function Timeline() {
  return (
    <Section id="path">
      <div className="container-px">
        <SectionHeading eyebrow="Moja pot" title="Časovnica" />
        <ol className="relative ml-3 border-l border-border">
          {timeline.map((t, i) => (
            <li key={i} className="mb-10 ml-6 last:mb-0">
              {/* Pika na črti */}
              <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-bg bg-primary" />
              <p className="text-sm font-semibold text-accent">{t.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
