"use client";

// Hook: pove, ali naj bosta floating gumba vidna.
// Skrita: na vrhu (#home), na Kontaktu (#contact) in v footerju.
// Vidna: drugje (ob scrollanju navzdol) — s prehodom v komponenti.
import { useEffect, useState } from "react";

export function useFloatingVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const home = document.getElementById("home");
    const contact = document.getElementById("contact");
    const footer = document.querySelector("footer");
    const watched = [home, contact, footer].filter(
      (el): el is Element => el !== null
    );
    if (!watched.length) return;

    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) intersecting.add(e.target);
          else intersecting.delete(e.target);
        });
        // Vidno le, če nobena od skritih sekcij ni v vidnem polju.
        setVisible(intersecting.size === 0);
      },
      { threshold: 0.15 }
    );
    watched.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return visible;
}
