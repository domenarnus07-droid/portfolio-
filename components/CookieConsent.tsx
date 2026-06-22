"use client";

// Animacijski prikaz piškotkov ob prvem obisku. Izbiro shrani v localStorage.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "dc-cookie-consent";

export function CookieConsent() {
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
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-md rounded-2xl border border-border glass p-5 shadow-2xl"
          role="dialog"
          aria-label="Obvestilo o piškotkih"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">🍪</span>
            <div className="flex-1">
              <p className="text-sm font-semibold">Piškotki</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Ta stran uporablja le nujne piškotke za boljšo izkušnjo. Brez sledenja.
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => decide("accepted")}
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Sprejmi
                </button>
                <button
                  onClick={() => decide("declined")}
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
                >
                  Zavrni
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
