"use client";

// Sekcija Projekti — mreža kartic iz data/projects.ts z filtrom po tehnologiji.
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

export function Projects() {
  const { t } = useI18n();
  const ALL = t.projects.all;
  const [filter, setFilter] = useState<string>("__all__");

  // Unikatne tehnologije iz vseh projektov (za gumbe filtra).
  const techs = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tech.forEach((tech) => set.add(tech)));
    return ["__all__", ...Array.from(set).sort()];
  }, []);

  const filtered =
    filter === "__all__" ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <Section id="projects">
      <div className="container-px">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          description={t.projects.desc}
        />

        {/* Filter po tehnologiji */}
        <div className="mb-8 flex flex-wrap gap-2">
          {techs.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setFilter(tech)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === tech
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-muted hover:border-primary hover:text-fg"
              }`}
            >
              {tech === "__all__" ? ALL : tech}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}
