"use client";

// Večjezičnost (SL / EN / HR). Slovar + kontekst + hook useI18n().
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "sl" | "en" | "hr";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "sl", label: "SL" },
  { code: "en", label: "EN" },
  { code: "hr", label: "HR" },
];

// Vsa prevedljiva besedila.
export const dict = {
  sl: {
    nav: { home: "Domov", projects: "Projekti", about: "O meni", path: "Pot", contact: "Kontakt" },
    hero: {
      badge: "Na voljo za projekte",
      greeting: "Živjo, sem",
      roles: ["Web developer", "študent", "full-stack razvijalec", "iz Slovenije"],
      slogan: "Gradim sodobne, hitre in lepe spletne strani. Osredotočen na čist dizajn in dober uporabniški občutek.",
      ctaProjects: "Poglej projekte",
      ctaContact: "Kontakt",
    },
    stats: { projects: "Projektov", live: "V živo", tech: "Tehnologij", dedication: "Predanost" },
    projects: {
      eyebrow: "Moje delo", title: "Projekti",
      desc: "Izbor projektov, ki sem jih zgradil — od spletnih trgovin do aplikacij z backendom.",
      all: "Vse", more: "Več o projektu", live: "Live demo", code: "Koda",
      soon: "Kmalu online", zoom: "Povečaj", back: "Nazaj na projekte",
    },
    about: {
      eyebrow: "Spoznaj me", title: "O meni", techTitle: "Tehnologije", cv: "Prenesi CV",
      p: [
        "Sem študent in spletni razvijalec iz Slovenije, ki rad spreminja ideje v delujoče izdelke.",
        "Gradim polne spletne aplikacije — od dizajna v ospredju do zaledja z bazo, prijavo in admin ploščo. Najraje delam s čistim, sodobnim videzom in dobrim uporabniškim občutkom.",
      ],
    },
    timeline: {
      eyebrow: "Moja pot", title: "Časovnica",
      items: [
        { year: "2026", title: "Maturitetni projekt — Domen Core", text: "Polna spletna trgovina s čevlji (Node.js, Express, MongoDB, Socket.io)." },
        { year: "2025–26", title: "Spletne rešitve za podjetja", text: "Elektro Novateh — spletna stran z backendom, koledar, PDF, push obvestila." },
        { year: "2025", title: "StudyOS", text: "Namizni delovni prostor za študente (React, Vite, Express)." },
        { year: "Trenutno", title: "Stalno učenje", text: "Nadgrajujem znanje full-stack razvoja in dizajna uporabniških izkušenj." },
      ],
    },
    contact: {
      eyebrow: "Stopi v stik", title: "Kontakt",
      desc: "Imaš projekt, vprašanje ali predlog? Piši mi — z veseljem odgovorim.",
      emailLabel: "E-pošta", phoneLabel: "Telefon", codeLabel: "Koda", networkLabel: "Mreženje",
      name: "Ime", email: "E-pošta", message: "Sporočilo",
      namePh: "Tvoje ime", emailPh: "tvoj@email.com", messagePh: "Tvoje sporočilo …",
      send: "Pošlji sporočilo", sending: "Pošiljam …", ok: "Sporočilo poslano! Hvala. ✅",
      errName: "Vnesi svoje ime.", errEmail: "Vnesi veljaven e-poštni naslov.", errMsg: "Sporočilo je prekratko.",
    },
    footer: { nav: "Navigacija", contact: "Kontakt", rights: "Vse pravice pridržane.", top: "Na vrh" },
    chatbot: { greeting: "Živjo! 👋 Sem Domnov pomočnik. Vprašaj me o njegovih projektih, znanjih ali kontaktu.", name: "Domnov pomočnik", sub: "Običajno odgovori takoj", placeholder: "Napiši sporočilo …" },
    cookie: { title: "Piškotki", text: "Ta stran uporablja le nujne piškotke za boljšo izkušnjo. Brez sledenja.", accept: "Sprejmi", decline: "Zavrni" },
    projDesc: {
      "domen-core": "Premium spletna trgovina s čevlji: prijava, košarica, naročila, admin plošča in klepet v realnem času. Hkrati moj maturitetni projekt.",
      "qr-generator": "Spletni generator QR kod in izkaznic za podjetje Elektro Novateh.",
      "elektro-novateh": "Spletna stran s celovitim backendom: koledar, PDF dokumenti, push obvestila in 2FA prijava.",
      "studyos": "Namizni delovni prostor za študente FERI — branje dokumentov, organizacija in prijava.",
    },
  },
  en: {
    nav: { home: "Home", projects: "Projects", about: "About", path: "Journey", contact: "Contact" },
    hero: {
      badge: "Available for projects",
      greeting: "Hi, I'm",
      roles: ["Web developer", "student", "full-stack developer", "from Slovenia"],
      slogan: "I build modern, fast and beautiful websites. Focused on clean design and great user experience.",
      ctaProjects: "View projects",
      ctaContact: "Contact",
    },
    stats: { projects: "Projects", live: "Live", tech: "Technologies", dedication: "Dedication" },
    projects: {
      eyebrow: "My work", title: "Projects",
      desc: "A selection of projects I've built — from online stores to full backend apps.",
      all: "All", more: "More about project", live: "Live demo", code: "Code",
      soon: "Coming online", zoom: "Zoom", back: "Back to projects",
    },
    about: {
      eyebrow: "Get to know me", title: "About", techTitle: "Technologies", cv: "Download CV",
      p: [
        "I'm a student and web developer from Slovenia who loves turning ideas into working products.",
        "I build full web applications — from front-end design to a backend with a database, authentication and an admin panel. I love a clean, modern look and great UX.",
      ],
    },
    timeline: {
      eyebrow: "My journey", title: "Timeline",
      items: [
        { year: "2026", title: "Final project — Domen Core", text: "Full shoe e-commerce store (Node.js, Express, MongoDB, Socket.io)." },
        { year: "2025–26", title: "Web solutions for companies", text: "Elektro Novateh — website with a backend, calendar, PDF, push notifications." },
        { year: "2025", title: "StudyOS", text: "A desktop workspace for students (React, Vite, Express)." },
        { year: "Now", title: "Continuous learning", text: "Improving my full-stack development and UX design skills." },
      ],
    },
    contact: {
      eyebrow: "Get in touch", title: "Contact",
      desc: "Got a project, question or idea? Write to me — I'll gladly reply.",
      emailLabel: "Email", phoneLabel: "Phone", codeLabel: "Code", networkLabel: "Network",
      name: "Name", email: "Email", message: "Message",
      namePh: "Your name", emailPh: "your@email.com", messagePh: "Your message …",
      send: "Send message", sending: "Sending …", ok: "Message sent! Thank you. ✅",
      errName: "Enter your name.", errEmail: "Enter a valid email address.", errMsg: "Message is too short.",
    },
    footer: { nav: "Navigation", contact: "Contact", rights: "All rights reserved.", top: "To top" },
    chatbot: { greeting: "Hi! 👋 I'm Domen's assistant. Ask me about his projects, skills or contact.", name: "Domen's assistant", sub: "Usually replies instantly", placeholder: "Type a message …" },
    cookie: { title: "Cookies", text: "This site uses only essential cookies for a better experience. No tracking.", accept: "Accept", decline: "Decline" },
    projDesc: {
      "domen-core": "Premium shoe store: login, cart, orders, admin panel and real-time chat. Also my final school project.",
      "qr-generator": "Web generator of QR codes and ID cards for the company Elektro Novateh.",
      "elektro-novateh": "Website with a complete backend: calendar, PDF documents, push notifications and 2FA login.",
      "studyos": "A desktop workspace for FERI students — document reading, organization and login.",
    },
  },
  hr: {
    nav: { home: "Početna", projects: "Projekti", about: "O meni", path: "Put", contact: "Kontakt" },
    hero: {
      badge: "Dostupan za projekte",
      greeting: "Bok, ja sam",
      roles: ["Web developer", "student", "full-stack developer", "iz Slovenije"],
      slogan: "Gradim moderne, brze i lijepe web stranice. Fokusiran na čist dizajn i dobar korisnički doživljaj.",
      ctaProjects: "Pogledaj projekte",
      ctaContact: "Kontakt",
    },
    stats: { projects: "Projekata", live: "Uživo", tech: "Tehnologija", dedication: "Predanost" },
    projects: {
      eyebrow: "Moj rad", title: "Projekti",
      desc: "Izbor projekata koje sam izradio — od web trgovina do aplikacija s backendom.",
      all: "Sve", more: "Više o projektu", live: "Live demo", code: "Kod",
      soon: "Uskoro online", zoom: "Povećaj", back: "Natrag na projekte",
    },
    about: {
      eyebrow: "Upoznaj me", title: "O meni", techTitle: "Tehnologije", cv: "Preuzmi CV",
      p: [
        "Student sam i web developer iz Slovenije koji voli pretvarati ideje u funkcionalne proizvode.",
        "Gradim potpune web aplikacije — od dizajna sučelja do backenda s bazom, prijavom i admin pločom. Najviše volim čist, moderan izgled i dobar UX.",
      ],
    },
    timeline: {
      eyebrow: "Moj put", title: "Vremenska crta",
      items: [
        { year: "2026", title: "Maturalni projekt — Domen Core", text: "Potpuna web trgovina obućom (Node.js, Express, MongoDB, Socket.io)." },
        { year: "2025–26", title: "Web rješenja za tvrtke", text: "Elektro Novateh — stranica s backendom, kalendar, PDF, push obavijesti." },
        { year: "2025", title: "StudyOS", text: "Radni prostor za studente (React, Vite, Express)." },
        { year: "Trenutno", title: "Stalno učenje", text: "Usavršavam full-stack razvoj i dizajn korisničkog iskustva." },
      ],
    },
    contact: {
      eyebrow: "Javi se", title: "Kontakt",
      desc: "Imaš projekt, pitanje ili prijedlog? Piši mi — rado ću odgovoriti.",
      emailLabel: "E-pošta", phoneLabel: "Telefon", codeLabel: "Kod", networkLabel: "Mreža",
      name: "Ime", email: "E-pošta", message: "Poruka",
      namePh: "Tvoje ime", emailPh: "tvoj@email.com", messagePh: "Tvoja poruka …",
      send: "Pošalji poruku", sending: "Šaljem …", ok: "Poruka poslana! Hvala. ✅",
      errName: "Unesi svoje ime.", errEmail: "Unesi valjanu e-mail adresu.", errMsg: "Poruka je prekratka.",
    },
    footer: { nav: "Navigacija", contact: "Kontakt", rights: "Sva prava pridržana.", top: "Na vrh" },
    chatbot: { greeting: "Bok! 👋 Ja sam Domenov asistent. Pitaj me o njegovim projektima, vještinama ili kontaktu.", name: "Domenov asistent", sub: "Obično odgovara odmah", placeholder: "Napiši poruku …" },
    cookie: { title: "Kolačići", text: "Ova stranica koristi samo nužne kolačiće za bolje iskustvo. Bez praćenja.", accept: "Prihvati", decline: "Odbij" },
    projDesc: {
      "domen-core": "Premium web trgovina obućom: prijava, košarica, narudžbe, admin ploča i chat u stvarnom vremenu. Ujedno moj maturalni projekt.",
      "qr-generator": "Web generator QR kodova i iskaznica za tvrtku Elektro Novateh.",
      "elektro-novateh": "Stranica s potpunim backendom: kalendar, PDF dokumenti, push obavijesti i 2FA prijava.",
      "studyos": "Radni prostor za studente FERI-ja — čitanje dokumenata, organizacija i prijava.",
    },
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof dict)["sl"] };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sl");

  useEffect(() => {
    const saved = localStorage.getItem("dc-lang") as Lang | null;
    if (saved && ["sl", "en", "hr"].includes(saved)) setLangState(saved);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("dc-lang", l);
    document.documentElement.lang = l;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n mora biti znotraj I18nProvider");
  return ctx;
}
