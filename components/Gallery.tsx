"use client";

// Galerija posnetkov projekta — lepa mreža + povečava ob kliku (lightbox).
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-bg shadow-sm transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/5"
          >
            <Image
              src={src}
              alt={`${title} — posnetek ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute right-2 top-2 rounded-md bg-black/50 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              🔍
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox z navigacijo */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Zapri"
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              ✕
            </button>

            {/* Prejšnja */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setActive((a) => (a! - 1 + images.length) % images.length); }}
              aria-label="Prejšnja"
              className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
            >
              ‹
            </button>

            <motion.div
              key={active}
              className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt={`${title} — posnetek ${active + 1}`}
                width={1280}
                height={800}
                className="h-auto w-full object-contain"
              />
            </motion.div>

            {/* Naslednja */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setActive((a) => (a! + 1) % images.length); }}
              aria-label="Naslednja"
              className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
            >
              ›
            </button>

            {/* Števec */}
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
              {active + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
