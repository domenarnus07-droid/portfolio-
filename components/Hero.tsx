"use client";

// Hero sekcija: ime, slogan, CTA gumba in prostor za maskota (placeholder).
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import { useI18n } from "@/lib/i18n";
import { Typewriter } from "./ui/Typewriter";
import { Mascot } from "./Mascot";

export function Hero() {
  const { t } = useI18n();
  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-center overflow-hidden pt-16"
    >
      {/* Subtilni animirani gradient v ozadju */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Subtilna mreža */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--color-border)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-border)) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(70% 60% at 50% 35%, black, transparent)",
            WebkitMaskImage: "radial-gradient(70% 60% at 50% 35%, black, transparent)",
          }}
        />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-blob [animation-delay:3s]" />
      </div>

      <div className="container-px grid items-center gap-12 md:grid-cols-2">
        {/* Besedilo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted sm:mt-0">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {t.hero.badge}
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t.hero.greeting}{" "}
            <span className="text-gradient">{siteConfig.name}</span>
          </h1>

          <p className="mt-4 text-lg font-medium text-accent">
            <Typewriter words={[...t.hero.roles]} />
          </p>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            {t.hero.slogan}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
            >
              {t.hero.ctaProjects}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {t.hero.ctaContact}
            </a>
          </div>
        </motion.div>

        {/* Prostor za maskota — placeholder, kasneje zamenjaš s svojim SVG */}
        <motion.div
          className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Maskot (komponenta Mascot) — zamenjaj v components/Mascot.tsx */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl animate-float" />
          <Mascot className="relative h-full w-full animate-float drop-shadow-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
