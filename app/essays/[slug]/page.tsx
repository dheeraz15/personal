import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { SiteFrame } from "@/components/site-frame";
import { getAllEssays, getEssay, getEssayImageUrl } from "@/lib/content";
import { formatEssayDate } from "@/lib/format";
import { site } from "@/lib/site";

type EssayPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllEssays().map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) return {};

  const image = getEssayImageUrl(slug, essay.cover);
  return {
    title: essay.title,
    description: essay.summary || site.description,
    alternates: { canonical: `/essays/${slug}/` },
    openGraph: {
      title: essay.title,
      description: essay.summary || site.description,
      type: "article",
      url: `/essays/${slug}/`,
      publishedTime: essay.date,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();

  const essays = getAllEssays();
  const index = essays.findIndex((item) => item.slug === slug);
  const newer = index > 0 ? essays[index - 1] : null;
  const older = index < essays.length - 1 ? essays[index + 1] : null;
  return (
    <SiteFrame>
      <main id="main" className="article-grid">
        <Link className="article-home box-link" href="/">Dhiraj</Link>
        <p className="article-date"><time dateTime={essay.date.slice(0, 10)}>{formatEssayDate(essay.date)}</time></p>
        <article className="article-body">
          <header className="article-heading">
            <h1>{essay.title}</h1>
          </header>
          <Markdown>{essay.content}</Markdown>
          {(newer || older) ? (
            <footer className="article-footer">
              <nav className="next-nav" aria-label="More essays">
                {newer ? <Link href={`/essays/${newer.slug}/`}><span>Next</span>{newer.title}</Link> : null}
                {older ? <Link href={`/essays/${older.slug}/`}><span>Previous</span>{older.title}</Link> : null}
              </nav>
            </footer>
          ) : null}
        </article>
      </main>
    </SiteFrame>
  );
}
