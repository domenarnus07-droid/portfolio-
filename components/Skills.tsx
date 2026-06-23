"use client";

// Animirane vrstice veščin (odstotki se napolnijo, ko pridejo v vidno polje).
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { skillLevels } from "@/lib/siteConfig";
import { useI18n } from "@/lib/i18n";

export function Skills() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section id="skills" className="bg-surface/40">
      <div className="container-px">
        <SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} />
        <div ref={ref} className="grid gap-5 md:grid-cols-2 md:gap-x-12">
          {skillLevels.map((s, i) => (
            <div key={s.name}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-fg">{s.name}</span>
                <span className="text-muted">{s.level}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-border/60">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
