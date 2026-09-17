import type { Metadata } from "next";
import { Markdown } from "@/components/markdown";
import { SiteFrame } from "@/components/site-frame";
import { ProjectLink } from "@/components/project-link";
import { SiteHeader } from "@/components/site-header";
import { getCv, getPageContent } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Dhiraj Chapagain: product manager at Third Factor AI, previously co-founder of Dailo Krishi and product at Khalti, based in Kathmandu.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/" },
};

export default function AboutPage() {
  const page = getPageContent("about.md");
  const cv = getCv();

  return (
    <SiteFrame tone="about">
      <SiteHeader title="Namaste" active="about" />
      <main id="main" className="about-grid">
        <div className="about-bio">
          <Markdown className="about-intro">{page.content}</Markdown>
          <section className="about-section" aria-labelledby="experience-heading">
            <h2 id="experience-heading">Experience</h2>
            <ul>
              {cv.experience.map((experience) => (
                <li key={experience.org} className="cv-item">
                  <p className="cv-when">{experience.when}</p>
                  <h3>{experience.url ? <a className="box-link" href={experience.url} rel="noopener">{experience.org}</a> : experience.org}</h3>
                  {experience.note ? <p className="cv-note">{experience.note}</p> : null}
                  <ul className="cv-roles">
                    {experience.roles.map((role) => (
                      <li key={`${role.title}-${role.period}`}>
                        <span>{role.title}</span>
                        <small>{role.period}{role.place ? ` · ${role.place}` : ""}</small>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="about-aside">
          <p className="about-lead">Product manager in Kathmandu, building products and writing about what the work teaches me.</p>
          <div className="about-links">
            {site.social.map((profile) => (
              <a key={profile.name} href={profile.url} target="_blank" rel="me noopener noreferrer">
                {profile.name} ↗
              </a>
            ))}
          </div>

          <section className="about-section" id="projects" aria-labelledby="projects-heading">
            <h2 id="projects-heading">Projects</h2>
            <ul>
              {cv.projects.map((project) => (
                <li key={project.name} className="cv-item">
                  <p className="cv-when">{project.period}</p>
                  <h3><ProjectLink name={project.name} url={project.url} /></h3>
                  <p className="cv-note">{project.blurb}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="about-section" aria-labelledby="education-heading">
            <h2 id="education-heading">Education</h2>
            <ul>
              {cv.education.map((education) => (
                <li key={education.org} className="cv-item">
                  <p className="cv-when">{education.when}</p>
                  <h3>{education.org}</h3>
                  <p className="cv-note">{education.title}</p>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </main>
    </SiteFrame>
  );
}
