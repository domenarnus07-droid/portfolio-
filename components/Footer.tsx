// Footer — stolpci (brand, navigacija, kontakt), gumb "na vrh", copyright.
import { siteConfig, navLinks } from "@/lib/siteConfig";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-surface/40">
      {/* tanka gradientna črta na vrhu */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container-px grid gap-8 py-9 sm:grid-cols-2 sm:py-10 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-2">
          <a href="#home" className="text-xl font-bold tracking-tight">
            <span className="text-gradient">{siteConfig.name}</span>
            <span className="text-accent">.</span>
          </a>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {siteConfig.slogan}
          </p>
          <div className="mt-5 flex gap-3">
            <a aria-label="GitHub" href={siteConfig.social.github} target="_blank" rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.5 18 4.8 18 4.8c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>
            </a>
            <a aria-label="LinkedIn" href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
            </a>
          </div>
        </div>

        {/* Navigacija */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-fg">Navigacija</h3>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-muted transition-colors hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-fg">Kontakt</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="text-muted transition-colors hover:text-primary">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.phoneHref} className="text-muted transition-colors hover:text-primary">
                {siteConfig.phone}
              </a>
            </li>
            <li className="text-muted">Slovenija</li>
          </ul>
        </div>
      </div>

      {/* Spodnja vrstica */}
      <div className="border-t border-border">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-4 sm:flex-row sm:py-5">
          <p className="text-xs text-muted">© {year} {siteConfig.name}. Vse pravice pridržane.</p>
          <a href="#home" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-primary">
            Na vrh
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
