import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

// Pisava Poppins prek next/font (samodejna optimizacija, brez FOUT)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// SEO + Open Graph metapodatki
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Web Developer`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.slogan,
  keywords: ["web developer", "Next.js", "portfolio", "Slovenija", siteConfig.name],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "sl_SI",
    url: siteConfig.url,
    title: `${siteConfig.name} — Web Developer`,
    description: siteConfig.slogan,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Web Developer`,
    description: siteConfig.slogan,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080d1e" },
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning je priporočen pri next-themes (class na <html>)
    <html lang="sl" className={poppins.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
