"use client";

// Pogosta vprašanja — razteg/zlaganje (accordion).
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-surface/40">
      <div className="container-px max-w-3xl">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold sm:text-base">{item.q}</span>
                  <span
                    className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
