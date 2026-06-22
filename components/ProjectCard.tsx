"use client";

// Kartica posameznega projekta s hover efektom.
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { Badge } from "./ui/Badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Predogledna slika */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg">
        <Image
          src={project.image}
          alt={`Predogled projekta ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Vsebina */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {/* Tehnologije */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {/* Gumbi (prikažemo le, če povezava obstaja) */}
        <div className="mt-5 flex items-center gap-3">
          {/* Če ni ne live ne kode, prikažemo nevsiljivo oznako "Kmalu" */}
          {!project.live && !project.github && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-4 py-2 text-sm font-medium text-muted">
              Kmalu online
            </span>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Live demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Koda
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
