# Domen Arnuš — Portfolio

Osebna developer portfolio stran (vizitka) z predstavitvijo projektov.

Zgrajeno z **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** in **next-themes** (temni/svetli način). Pisava **Poppins**. Kontaktni obrazec pošilja e-pošto prek **Resend**.

## Funkcije
- Single-page z navigacijo (Domov, Projekti, O meni, Kontakt)
- Temno modri (navy) dark mode + svetli način, brez "flasha"
- Subtilne animacije ob scrollanju (fade-in / slide-up)
- Polno odziven (mobile-first)
- SEO + Open Graph metapodatki
- Kontaktni obrazec z validacijo (Resend)

## Zagon (razvoj)
```bash
npm install
npm run dev
```
Privzeti port je **3888** (z banerjem). Odpri http://localhost:3888.

> Drugačen port: `PORT=3000 npm run dev`. Brez banerja: `npm run dev:plain`.

## Okoljske spremenljivke
Kopiraj `.env.example` v `.env.local` in izpolni:
```
RESEND_API_KEY=re_...
CONTACT_TO=domen.arnus07@gmail.com
```
Brez `RESEND_API_KEY` stran deluje, le kontaktni obrazec javi napako.

## Urejanje vsebine
- **Projekti:** [data/projects.ts](data/projects.ts)
- **Ime, slogan, povezave, "O meni", skills:** [lib/siteConfig.ts](lib/siteConfig.ts)
- **Barve / tema:** CSS spremenljivke v [app/globals.css](app/globals.css)
- **Screenshoti projektov:** `public/projects/` (zamenjaj `.svg` placeholderje)
- **Maskot:** prostor v [components/Hero.tsx](components/Hero.tsx); **CV:** `public/cv.pdf` + `cvPath` v siteConfig

## Build (produkcija)
```bash
npm run build
npm start
```

## Deploy

### Vercel (priporočeno za Next.js)
1. Potisni kodo na GitHub.
2. Na https://vercel.com → **Add New → Project** → izberi repo.
3. Vercel samodejno zazna Next.js (brez posebnih nastavitev).
4. V **Settings → Environment Variables** dodaj `RESEND_API_KEY` (in `CONTACT_TO`).
5. **Deploy**.

### Docker (lasten strežnik)
Projekt uporablja `output: "standalone"` (glej `next.config.js`).
```bash
# Gradnja slike
docker build -t domen-portfolio .

# Zagon (port 3000, z env za kontakt)
docker run -p 3000:3000 \
  -e RESEND_API_KEY=re_... \
  -e CONTACT_TO=domen.arnus07@gmail.com \
  domen-portfolio
```
Odpri http://localhost:3000.

## Struktura
```
app/            # App Router (layout, page, globals.css, api/contact)
components/      # Navbar, Hero, Projects, About, Contact, Footer, ui/
data/projects.ts# Podatki o projektih
lib/siteConfig.ts# Konfiguracija strani
public/projects/ # Screenshoti
scripts/dev.js  # Dev zagon z banerjem
```

---
© Domen Arnuš
