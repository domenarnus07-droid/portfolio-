"use client";

// Sekcija "Kontakt" — obrazec z validacijo (pošlje na /api/contact prek Resend)
// in povezave (GitHub, LinkedIn, e-pošta).
import { useState } from "react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { siteConfig } from "@/lib/siteConfig";

type Status = "idle" | "sending" | "ok" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Preprosta validacija na strani odjemalca.
  function validate() {
    if (form.name.trim().length < 2) return "Vnesi svoje ime.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) return "Vnesi veljaven e-poštni naslov.";
    if (form.message.trim().length < 5) return "Sporočilo je prekratko.";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setStatus("error");
      setErrorMsg(v);
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Napaka pri pošiljanju.");
      }
      setStatus("ok");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Napaka pri pošiljanju.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-bg px-4 py-3 text-fg outline-none transition-colors focus:border-primary";

  return (
    <Section id="contact">
      <div className="container-px grid gap-12 md:grid-cols-2 md:items-start">
        {/* Levo: opis + povezave */}
        <div>
          <SectionHeading
            eyebrow="Stopi v stik"
            title="Kontakt"
            description="Imaš projekt, vprašanje ali predlog? Piši mi — z veseljem odgovorim."
          />
          <ul className="space-y-3">
            <li>
              <a
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3.5 transition-colors hover:border-primary"
                href={`mailto:${siteConfig.email}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>
                </span>
                <span>
                  <span className="block text-xs text-muted">E-pošta</span>
                  <span className="text-sm font-medium text-fg group-hover:text-primary">{siteConfig.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3.5 transition-colors hover:border-primary"
                href={siteConfig.phoneHref}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </span>
                <span>
                  <span className="block text-xs text-muted">Telefon</span>
                  <span className="text-sm font-medium text-fg group-hover:text-primary">{siteConfig.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3.5 transition-colors hover:border-primary"
                href={siteConfig.social.github} target="_blank" rel="noopener noreferrer"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.5 18 4.8 18 4.8c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>
                </span>
                <span>
                  <span className="block text-xs text-muted">Koda</span>
                  <span className="text-sm font-medium text-fg group-hover:text-primary">GitHub</span>
                </span>
              </a>
            </li>
            <li>
              <a
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3.5 transition-colors hover:border-primary"
                href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
                </span>
                <span>
                  <span className="block text-xs text-muted">Mreženje</span>
                  <span className="text-sm font-medium text-fg group-hover:text-primary">LinkedIn</span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* Desno: obrazec */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-2xl border border-border glass p-6 shadow-xl shadow-primary/5">
          {/* Honeypot — skrito polje za zaznavo botov (uporabnik ga ne vidi) */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <div>
            <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium">Ime</label>
            <input id="c-name" type="text" className={inputClass} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tvoje ime" />
          </div>
          <div>
            <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium">E-pošta</label>
            <input id="c-email" type="email" className={inputClass} value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tvoj@email.com" />
          </div>
          <div>
            <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium">Sporočilo</label>
            <textarea id="c-message" rows={5} className={inputClass} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tvoje sporočilo ..." />
          </div>

          <button type="submit" disabled={status === "sending"}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60">
            {status === "sending" ? "Pošiljam ..." : "Pošlji sporočilo"}
          </button>

          {/* Povratne informacije */}
          {status === "ok" && (
            <p className="text-sm font-medium text-primary" role="status">Sporočilo poslano! Hvala. ✅</p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-accent" role="alert">{errorMsg}</p>
          )}
        </form>
      </div>
    </Section>
  );
}
