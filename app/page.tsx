import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { SiteHeader } from "@/components/site-header";
import { getAllEssays, getCv, getPageContent } from "@/lib/content";
import { formatEssayDate } from "@/lib/format";

export default function HomePage() {
  const page = getPageContent("_index.md");
  const essays = getAllEssays();
  const cv = getCv();

  return (
    <SiteFrame>
      <SiteHeader title="Hello, I’m Dhiraj" active="home" />
      <main id="main" className="home-grid">
        <section className="home-projects" aria-labelledby="projects-heading">
          <h2 id="projects-heading"><Link className="box-link" href="/about/#projects">Projects</Link></h2>
          {cv.projects.map((project) => (
            <div className="home-list-item" key={project.name}>
              <h3>{project.url ? <a className="box-link" href={project.url} rel="noopener">{project.name}</a> : project.name}</h3>
              <p>{project.blurb}</p>
            </div>
          ))}
          <h3><Link className="box-link dimmed" href="/about/#projects">See all projects →</Link></h3>
        </section>

        <section className="home-essays" aria-labelledby="essays-heading">
          <h2 id="essays-heading"><Link className="box-link" href="/essays/">Thoughts &amp; ideas</Link></h2>
          {essays.slice(0, 5).map((essay) => (
            <div className="home-list-item" key={essay.slug}>
              <h3><Link className="box-link" href={`/essays/${essay.slug}/`}>{essay.title}</Link></h3>
              <p>{essay.summary} <time dateTime={essay.date.slice(0, 10)}>{formatEssayDate(essay.date, true)}</time></p>
            </div>
          ))}
          <h3><Link className="box-link dimmed" href="/essays/">Browse all essays →</Link></h3>
        </section>

        <aside className="home-intro">
          {page.statement ? (
            <p className="home-statement">
              {page.statement} People, process and products at scale are what I focus on.
            </p>
          ) : null}
          <div className="quick-links">
            <Link href="/about/">Read more about me →</Link>
            <Link href="/essays/">Browse my writing →</Link>
          </div>
        </aside>
      </main>
    </SiteFrame>
  );
}
