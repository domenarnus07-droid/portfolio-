"use client";

// Sekcija "Kontakt" — obrazec z validacijo (pošlje na /api/contact prek Resend)
// in povezave (GitHub, LinkedIn, e-pošta).
import { useState } from "react";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { siteConfig } from "@/lib/siteConfig";

type Status = "idle" | "sending" | "ok" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      setForm({ name: "", email: "", message: "" });
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
          <ul className="space-y-3 text-sm">
            <li>
              <a className="inline-flex items-center gap-2 text-muted transition-colors hover:text-primary" href={`mailto:${siteConfig.email}`}>
                ✉️ {siteConfig.email}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-muted transition-colors hover:text-primary" href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                💻 GitHub
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-muted transition-colors hover:text-primary" href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
                🔗 LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Desno: obrazec */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-2xl border border-border bg-surface p-6">
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
