"use client";

// Wrapper za sekcije z subtilno fade-in / slide-up animacijo ob scrollanju.
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      // scroll-margin, da fiksen navbar ne prekrije naslova ob skoku na sidro
      className={`scroll-mt-24 py-20 sm:py-28 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
