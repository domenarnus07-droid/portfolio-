import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
  ];
  // Posamezne strani projektov
  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteConfig.url}/projekti/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...base, ...projectPages];
}
