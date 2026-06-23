"use client";

// Animacijski prikaz piškotkov ob prvem obisku. Izbiro shrani v localStorage.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const KEY = "dc-cookie-consent";

export function CookieConsent() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Prikaži le, če uporabnik še ni izbral.
    const saved = typeof window !== "undefined" ? localStorage.getItem(KEY) : "1";
    if (!saved) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function decide(value: "accepted" | "declined") {
    localStorage.setItem(KEY, value);
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-sm overflow-hidden rounded-2xl border border-border glass shadow-2xl"
          role="dialog"
          aria-label="Obvestilo o piškotkih"
        >
          {/* gradientna črta na vrhu */}
          <div className="h-1 w-full bg-gradient-to-r from-primary to-accent" />
          <div className="p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl">
                🍪
              </span>
              <p className="text-base font-semibold">{t.cookie.title}</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t.cookie.text}
            </p>
            <div className="mt-4 flex gap-2.5">
              <button
                onClick={() => decide("accepted")}
                className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
              >
                {t.cookie.accept}
              </button>
              <button
                onClick={() => decide("declined")}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-fg hover:text-fg"
              >
                {t.cookie.decline}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
