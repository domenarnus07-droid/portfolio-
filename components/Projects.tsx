"use client";

// Sekcija Projekti — mreža kartic iz data/projects.ts z filtrom po tehnologiji.
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";

const ALL = "Vse";

export function Projects() {
  const [filter, setFilter] = useState<string>(ALL);

  // Unikatne tehnologije iz vseh projektov (za gumbe filtra).
  const techs = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return [ALL, ...Array.from(set).sort()];
  }, []);

  const filtered =
    filter === ALL ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <Section id="projects">
      <div className="container-px">
        <SectionHeading
          eyebrow="Moje delo"
          title="Projekti"
          description="Izbor projektov, ki sem jih zgradil — od spletnih trgovin do aplikacij z backendom."
        />

        {/* Filter po tehnologiji */}
        <div className="mb-8 flex flex-wrap gap-2">
          {techs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === t
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-muted hover:border-primary hover:text-fg"
              }`}
            >
              {t}
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
