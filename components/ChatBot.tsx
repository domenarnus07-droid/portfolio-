"use client";

// AI klepetalni pomočnik — lebdeč gumb spodaj desno + klepetalno okno.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFloatingVisible } from "@/lib/useFloatingVisible";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Živjo! 👋 Sem Domnov pomočnik. Vprašaj me o njegovih projektih, znanjih ali kontaktu.",
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visible = useFloatingVisible();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "Oprosti, nekaj je šlo narobe." }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Napaka pri povezavi. Poskusi kasneje." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Lebdeč gumb (skrit na vrhu/kontaktu/footerju, razen ko je klepet odprt) */}
      <AnimatePresence>
        {(visible || open) && (
          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Zapri klepet" : "Odpri klepet"}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-5 right-5 z-[95] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Klepetalno okno */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 bottom-3 top-20 z-[95] flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl sm:inset-x-auto sm:bottom-24 sm:right-5 sm:top-auto sm:h-[28rem] sm:w-[calc(100vw-2.5rem)] sm:max-w-sm"
          >
            {/* Glava */}
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary/15 to-accent/10 p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">D</span>
              <div>
                <p className="text-sm font-semibold">Domnov pomočnik</p>
                <p className="text-xs text-muted">Običajno odgovori takoj</p>
              </div>
            </div>

            {/* Sporočila */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-primary text-white"
                        : "border border-border bg-bg text-fg"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-border bg-bg px-3.5 py-2 text-sm text-muted">…</div>
                </div>
              )}
            </div>

            {/* Vnos */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Napiši sporočilo …"
                className="flex-1 rounded-full border border-border bg-bg px-4 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Pošlji"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-opacity disabled:opacity-50"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
