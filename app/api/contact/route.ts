// API route za kontaktni obrazec — pošlje e-pošto prek Resend.
// Nastavi okoljski spremenljivki RESEND_API_KEY in CONTACT_TO (prejemnik).
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/siteConfig";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Strežniška validacija
    if (
      !name || typeof name !== "string" || name.trim().length < 2 ||
      !email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ||
      !message || typeof message !== "string" || message.trim().length < 5
    ) {
      return NextResponse.json({ error: "Neveljavni podatki obrazca." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Brez ključa ne moremo poslati — jasna napaka za razvoj.
      return NextResponse.json(
        { error: "Pošiljanje ni nastavljeno (manjka RESEND_API_KEY)." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO || siteConfig.email;

    await resend.emails.send({
      // Privzeti pošiljatelj Resend; za lastno domeno nastavi CONTACT_FROM.
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Novo sporočilo s portfolia — ${name}`,
      text: `Ime: ${name}\nE-pošta: ${email}\n\nSporočilo:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Napaka pri pošiljanju sporočila." }, { status: 500 });
  }
}
