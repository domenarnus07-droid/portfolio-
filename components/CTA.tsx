"use client";

// CTA pas pred footerjem — poziv k stiku.
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function CTA() {
  const { t } = useI18n();
  return (
    <section className="container-px py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/15 via-surface to-accent/10 p-10 text-center sm:p-14"
      >
        {/* okrasna bloba */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
        <h2 className="relative text-2xl font-bold tracking-tight sm:text-4xl">{t.cta.title}</h2>
        <p className="relative mx-auto mt-3 max-w-xl text-muted">{t.cta.text}</p>
        <a
          href="#contact"
          className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
        >
          {t.cta.button}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </motion.div>
    </section>
  );
}
