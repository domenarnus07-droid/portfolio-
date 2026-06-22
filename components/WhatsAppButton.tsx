"use client";

// Floating WhatsApp gumb (levo spodaj). Skrit na vrhu/kontaktu/footerju,
// prikaže se z animacijo ob scrollanju navzdol.
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import { useFloatingVisible } from "@/lib/useFloatingVisible";

export function WhatsAppButton() {
  const visible = useFloatingVisible();
  // Iz tel:+38631859165 → 38631859165
  const number = siteConfig.phoneHref.replace(/[^\d]/g, "");
  const href = `https://wa.me/${number}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Piši na WhatsApp"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group fixed bottom-5 left-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30"
        >
          {/* utripajoč obroč */}
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 group-hover:opacity-0" />
          <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <path d="M16.04 4c-6.6 0-12 5.4-12 12 0 2.1.55 4.16 1.6 5.98L4 28l6.2-1.6a12 12 0 0 0 5.84 1.5c6.6 0 12-5.4 12-12s-5.4-12-12-12zm0 21.9c-1.86 0-3.68-.5-5.27-1.45l-.38-.22-3.68.96.98-3.58-.25-.37a9.86 9.86 0 0 1-1.52-5.27c0-5.46 4.44-9.9 9.91-9.9 2.65 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.47-4.44 9.9-9.9 9.9zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
