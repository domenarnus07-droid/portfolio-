"use client";

// Sekcija "O meni" — kratka predstavitev + tehnologije/skills + opcijski CV.
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { siteConfig, skills } from "@/lib/siteConfig";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();
  return (
    <Section id="about" className="bg-surface/40">
      <div className="container-px grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start">
        {/* Predstavitev */}
        <div>
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
          <div className="space-y-4 text-base leading-relaxed text-muted">
            {t.about.p.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* CV gumb (prikazan le, če je pot nastavljena) */}
          {siteConfig.cvPath && (
            <a
              href={siteConfig.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {t.about.cv}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </a>
          )}
        </div>

        {/* Tehnologije */}
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            {t.about.techTitle}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
