// Osrednja konfiguracija strani — uredi svoje podatke tukaj.
export const siteConfig = {
  name: "Domen Arnuš", // [TODO: preveri zapis imena]
  role: "Web developer · študent · Slovenija",
  slogan:
    "Gradim sodobne, hitre in lepe spletne strani. Osredotočen na čist dizajn in dober uporabniški občutek.",
  url: "https://domen-developer.vercel.app", // produkcijska domena (SEO/OG)
  email: "domen.arnus07@gmail.com",
  phone: "031 859 165",
  phoneHref: "tel:+38631859165",
  social: {
    github: "https://github.com/domenarnus07-droid",
    linkedin: "https://www.linkedin.com/in/domen-arnu%C5%A1-836a11418/",
  },
  // CV datoteko daj v /public (npr. /public/cv.pdf). Prazno = gumb se skrije.
  cvPath: "", // npr. "/cv.pdf"
  // Kratka predstavitev za sekcijo "O meni" (uredi po želji).
  about: [
    "Sem študent in spletni razvijalec iz Slovenije, ki rad spreminja ideje v delujoče izdelke.",
    "Gradim polne spletne aplikacije — od dizajna v ospredju do zaledja z bazo, prijavo in admin ploščo. Najraje delam s čistim, sodobnim videzom in dobrim uporabniškim občutkom.",
  ],
} as const;

// Časovnica / pot (uredi po želji).
export const timeline = [
  {
    year: "2026",
    title: "Maturitetni projekt — Domen Core",
    text: "Polna spletna trgovina s čevlji (Node.js, Express, MongoDB, Socket.io).",
  },
  {
    year: "2025–26",
    title: "Spletne rešitve za podjetja",
    text: "Elektro Novateh — spletna stran z backendom, koledar, PDF, push obvestila.",
  },
  {
    year: "2025",
    title: "StudyOS",
    text: "Namizni delovni prostor za študente (React, Vite, Express).",
  },
  {
    year: "Trenutno",
    title: "Stalno učenje",
    text: "Nadgrajujem znanje full-stack razvoja in dizajna uporabniških izkušenj.",
  },
] as const;

// Tehnologije / znanja za prikaz kot značke.
export const skills = [
  "JavaScript", "TypeScript", "Node.js", "Express",
  "Next.js", "React", "MongoDB", "Tailwind CSS",
  "HTML", "CSS", "Framer Motion", "Git",
] as const;

// Navigacijske povezave (sidranje na sekcije)
export const navLinks = [
  { href: "#home", label: "Domov" },
  { href: "#projects", label: "Projekti" },
  { href: "#about", label: "O meni" },
  { href: "#contact", label: "Kontakt" },
] as const;
