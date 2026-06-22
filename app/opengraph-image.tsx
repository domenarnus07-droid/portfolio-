import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

// Samodejno generirana Open Graph slika (1200x630) za deljenje na omrežjih.
export const runtime = "edge";
export const alt = `${siteConfig.name} — Web Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(60% 60% at 15% 10%, rgba(59,130,246,0.35), transparent 60%), radial-gradient(50% 50% at 100% 0%, rgba(249,115,22,0.25), transparent 55%), #080d1e",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#60a5fa", fontWeight: 700, letterSpacing: 2 }}>
          PORTFOLIO
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 800, marginTop: 10 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#fb923c", marginTop: 8 }}>
          {siteConfig.role}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#94a3b8", marginTop: 28, maxWidth: 900 }}>
          {siteConfig.slogan}
        </div>
      </div>
    ),
    { ...size }
  );
}
