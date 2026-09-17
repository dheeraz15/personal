import { getAllEssays } from "@/lib/content";
import { escapeXml } from "@/lib/format";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const items = getAllEssays()
    .map((essay) => {
      const url = `${site.url}/essays/${essay.slug}/`;
      return `<item>
        <title>${escapeXml(essay.title)}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${new Date(essay.date).toUTCString()}</pubDate>
        <description>${escapeXml(essay.summary)}</description>
      </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
