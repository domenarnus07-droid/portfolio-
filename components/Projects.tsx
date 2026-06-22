// Sekcija Projekti — mreža kartic iz data/projects.ts.
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects">
      <div className="container-px">
        <SectionHeading
          eyebrow="Moje delo"
          title="Projekti"
          description="Izbor projektov, ki sem jih zgradil — od spletnih trgovin do aplikacij z backendom."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </Section>
  );
}
