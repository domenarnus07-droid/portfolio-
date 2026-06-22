// Osrednja konfiguracija strani — uredi svoje podatke tukaj.
export const siteConfig = {
  name: "Domen Arnuš", // [TODO: preveri zapis imena]
  role: "Web developer · dijak · Slovenija",
  slogan:
    "Gradim sodobne, hitre in lepe spletne strani. Osredotočen na čist dizajn in dober uporabniški občutek.",
  url: "https://domen.dev", // [TODO: tvoja domena za SEO/OG]
  email: "domen.arnus07@gmail.com",
  social: {
    github: "https://github.com/domenarnus07-droid",
    linkedin: "https://www.linkedin.com/in/domen-arnu%C5%A1-836a11418/",
  },
  // CV datoteko daj v /public (npr. /public/cv.pdf). Prazno = gumb se skrije.
  cvPath: "", // npr. "/cv.pdf"
  // Kratka predstavitev za sekcijo "O meni" (uredi po želji).
  about: [
    "Sem dijak in spletni razvijalec iz Slovenije, ki rad spreminja ideje v delujoče izdelke.",
    "Gradim polne spletne aplikacije — od dizajna v ospredju do zaledja z bazo, prijavo in admin ploščo. Najraje delam s čistim, sodobnim videzom in dobrim uporabniškim občutkom.",
  ],
} as const;

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
