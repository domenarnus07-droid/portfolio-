// AI klepetalni pomočnik za portfolio.
// Če je nastavljen ANTHROPIC_API_KEY, uporabi Claude; sicer pameten
// rezervni odgovor iz podatkov o Domnu (deluje brez ključa in stroškov).
import { NextResponse } from "next/server";
import { siteConfig, skills } from "@/lib/siteConfig";
import { projects } from "@/data/projects";

// Kontekst o Domnu za model / rezervni odgovor.
const projectList = projects
  .map((p) => `- ${p.title}: ${p.description} [tehnologije: ${p.tech.join(", ")}]${p.live ? ` (live: ${p.live})` : ""}`)
  .join("\n");

const CONTEXT = `Ime: ${siteConfig.name}
Vloga: ${siteConfig.role}
O njem: ${siteConfig.about.join(" ")}
Tehnologije: ${skills.join(", ")}
E-pošta: ${siteConfig.email}
Telefon: ${siteConfig.phone}
GitHub: ${siteConfig.social.github}
LinkedIn: ${siteConfig.social.linkedin}
Projekti:
${projectList}`;

const SYSTEM = `Si prijazen pomočnik na portfolio strani razvijalca ${siteConfig.name}.
Odgovarjaj kratko in v slovenščini. Pomagaj obiskovalcu izvedeti o Domnu, njegovih
projektih, znanjih in kako stopiti v stik. Če nečesa ne veš, predlagaj kontakt.
Podatki:
${CONTEXT}`;

// Preprost rezervni odgovor (brez AI ključa) na podlagi ključnih besed.
function fallbackReply(message: string): string {
  const m = message.toLowerCase();
  if (/projekt|delo|aplikacij|stran|naredil/.test(m)) {
    return `Domen je naredil več projektov:\n${projectList}\n\nVeč najdeš v sekciji Projekti.`;
  }
  if (/kontakt|email|e-?pošt|telefon|piš|stik|najem/.test(m)) {
    return `Stopi v stik z Domnom:\n✉️ ${siteConfig.email}\n📞 ${siteConfig.phone}\n🔗 ${siteConfig.social.linkedin}`;
  }
  if (/tehnolog|znanj|skill|jezik|orodj/.test(m)) {
    return `Domen dela z: ${skills.join(", ")}.`;
  }
  if (/kdo|o tebi|o njem|predstav|domen/.test(m)) {
    return `${siteConfig.name} — ${siteConfig.role}. ${siteConfig.about[0]}`;
  }
  if (/pozdrav|zdravo|živjo|hej|hello|hi/.test(m)) {
    return `Živjo! 👋 Sem pomočnik na Domnovi strani. Vprašaj me o njegovih projektih, znanjih ali kontaktu.`;
  }
  return `Lahko ti povem o Domnovih projektih, tehnologijah ali kontaktu. Kaj te zanima? (Lahko pa mu pišeš na ${siteConfig.email}.)`;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    if (!Array.isArray(messages) || !messages.length) {
      return NextResponse.json({ error: "Manjkajo sporočila." }, { status: 400 });
    }
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content || "";

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Brez ključa — rezervni odgovor.
      return NextResponse.json({ reply: fallbackReply(String(lastUser)) });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: SYSTEM,
        messages: messages.slice(-8).map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: String(m.content || ""),
        })),
      }),
    });

    if (!res.ok) {
      // Pri napaki API-ja uporabi rezervo.
      return NextResponse.json({ reply: fallbackReply(String(lastUser)) });
    }
    const data = await res.json();
    const reply = data?.content?.[0]?.text || fallbackReply(String(lastUser));
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Napaka pri klepetu." }, { status: 500 });
  }
}
