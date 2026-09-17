import type { MetadataRoute } from "next";
import { getAllEssays } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ["", "/essays/", "/about/"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  return [
    ...pages,
    ...getAllEssays().map((essay) => ({
      url: `${site.url}/essays/${essay.slug}/`,
      lastModified: new Date(essay.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
