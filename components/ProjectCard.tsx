"use client";

// Kartica posameznega projekta s hover efektom in lightboxom slike.
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { Badge } from "./ui/Badge";
import { useI18n } from "@/lib/i18n";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  const [zoom, setZoom] = useState(false);
  const description =
    t.projDesc[project.id as keyof typeof t.projDesc] || project.description;

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Predogledna slika — klik odpre lightbox */}
      <button
        type="button"
        onClick={() => setZoom(true)}
        aria-label={`Povečaj sliko projekta ${project.title}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-bg"
      >
        <Image
          src={project.image}
          alt={`Predogled projekta ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 rounded-md bg-black/50 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          🔍 {t.projects.zoom}
        </span>
      </button>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-xl"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.image}
                alt={`Projekt ${project.title}`}
                width={1280}
                height={800}
                className="h-auto w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setZoom(false)}
                aria-label="Zapri"
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vsebina */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {description}
        </p>

        {/* Tehnologije */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {/* Povezava na podrobno stran projekta */}
        <Link
          href={`/projekti/${project.id}`}
          className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-accent"
        >
          {t.projects.more} →
        </Link>

        {/* Gumbi (prikažemo le, če povezava obstaja) */}
        <div className="mt-5 flex items-center gap-3">
          {/* Če ni ne live ne kode, prikažemo nevsiljivo oznako "Kmalu" */}
          {!project.live && !project.github && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-4 py-2 text-sm font-medium text-muted">
              {t.projects.soon}
            </span>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {t.projects.live}
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
              {t.projects.code}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
