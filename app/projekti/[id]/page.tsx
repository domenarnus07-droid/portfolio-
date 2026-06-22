import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/siteConfig";
import { Badge } from "@/components/ui/Badge";

// Generiraj statične poti za vse projekte.
export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description },
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) notFound();

  return (
    <main className="container-px py-16 sm:py-24">
      <Link href="/#projects" className="text-sm text-muted transition-colors hover:text-primary">
        ← Nazaj na projekte
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Live demo ↗
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Koda
          </a>
        )}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border">
        <Image
          src={project.image}
          alt={`Predogled projekta ${project.title}`}
          width={1280}
          height={800}
          className="h-auto w-full object-cover"
        />
      </div>
    </main>
  );
}
