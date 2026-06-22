// Footer — copyright, leto in povezave.
import { siteConfig, navLinks } from "@/lib/siteConfig";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container-px flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        {/* Logotip / ime */}
        <a href="#home" className="text-lg font-bold tracking-tight">
          <span className="text-primary">{siteConfig.name.split(" ")[0]}</span>
          <span className="text-accent">.</span>
        </a>

        {/* Navigacija */}
        <nav className="flex flex-wrap justify-center gap-5" aria-label="Footer navigacija">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted transition-colors hover:text-fg">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex gap-4 text-sm">
          <a className="text-muted transition-colors hover:text-primary" href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="text-muted transition-colors hover:text-primary" href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className="container-px pb-8 text-center text-xs text-muted">
        © {year} {siteConfig.name}. Vse pravice pridržane.
      </div>
    </footer>
  );
}
