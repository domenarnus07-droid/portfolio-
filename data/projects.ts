// Podatki o projektih — uredi tukaj (dodaj/odstrani/popravi).
// Prazna povezava ("") pomeni, da se gumb ("Live demo" / "Koda") ne prikaže.
// Sliko daj v public/projects/ in vpiši pot (npr. "/projects/domen-core.png").

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  live: string; // URL delujoče strani ali "" če (še) ni online
  github: string; // URL repozitorija ali "" če ni javno
  image: string; // pot do screenshota v /public
};

export const projects: Project[] = [
  {
    id: "domen-core",
    title: "Domen Core",
    description:
      "Premium spletna trgovina s čevlji: prijava, košarica, naročila, admin plošča in klepet v realnem času. Hkrati moj maturitetni projekt.",
    tech: ["Node.js", "Express", "MongoDB", "Socket.io"],
    live: "https://domen-core.onrender.com",
    github: "https://github.com/domenarnus07-droid/domen-core",
    image: "/projects/domen-core.png",
  },
  {
    id: "qr-generator",
    title: "QR Generator — Elektro Novateh",
    description: "Spletni generator QR kod in izkaznic za podjetje Elektro Novateh.",
    tech: ["HTML", "JavaScript", "Framer Motion"],
    live: "https://qr-koda.onrender.com",
    github: "https://github.com/domenarnus07-droid/qr-koda",
    image: "/projects/qr-generator.png",
  },
  {
    id: "elektro-novateh",
    title: "Elektro Novateh",
    description:
      "Spletna stran s celovitim backendom: koledar, PDF dokumenti, push obvestila in 2FA prijava.",
    tech: ["Node.js", "Express", "MongoDB", "PDFKit"],
    live: "https://elektronovateh.onrender.com",
    github: "https://github.com/domenarnus07-droid/elektronovateh",
    image: "/projects/elektro-novateh.png",
  },
  {
    id: "studyos",
    title: "StudyOS",
    description:
      "Namizni delovni prostor za študente FERI — branje dokumentov, organizacija in prijava.",
    tech: ["React", "Vite", "Express", "MongoDB"],
    live: "https://aplikacijafaks.onrender.com",
    github: "https://github.com/domenarnus07-droid/aplikacijafaks",
    image: "/projects/studyos.png",
  },
];
