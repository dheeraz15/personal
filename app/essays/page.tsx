import type { Metadata } from "next";
import { EssayList } from "@/components/essay-list";
import { SiteFrame } from "@/components/site-frame";
import { SiteHeader } from "@/components/site-header";
import { getAllEssays } from "@/lib/content";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Essays by Dhiraj Chapagain on product, process, belief and the work of building things with people.",
  alternates: { canonical: "/essays/" },
  openGraph: { url: "/essays/" },
};

export default function EssaysPage() {
  const essays = getAllEssays();

  return (
    <SiteFrame>
      <SiteHeader title="Essays" active="essays" />
      <main id="main" className="archive-grid">
        {essays.length ? <EssayList essays={essays} /> : <p className="dimmed">Nothing here yet.</p>}
      </main>
    </SiteFrame>
  );
}
