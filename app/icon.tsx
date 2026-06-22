import { ImageResponse } from "next/og";

// Favicon (logo v zavihku) — monogram "D." v brand barvah.
export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1430, #142a5a)",
          color: "#60a5fa",
          fontSize: 40,
          fontWeight: 800,
          borderRadius: 14,
          fontFamily: "sans-serif",
        }}
      >
        D<span style={{ color: "#fb923c" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
