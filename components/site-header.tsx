import Link from "next/link";
import { site } from "@/lib/site";

type SiteHeaderProps = {
  title: string;
  active: "home" | "about" | "essays";
};

const navigation = [
  { href: "/about/", label: "About", id: "about" },
  { href: "/essays/", label: "Essays", id: "essays" },
  ...site.social.map((profile) => ({
    href: profile.url,
    label: profile.name,
    id: profile.name.toLowerCase(),
    external: true,
  })),
]

// Every page uses the same header so the menu sits at the same height
// wherever you are on the site.
export function SiteHeader({ title, active }: SiteHeaderProps) {
  const headerClass = "site-header site-header-hero";

  return (
    <header className={headerClass}>
      <h1 className="site-title">{title}</h1>
      <nav className="site-menu" aria-label="Primary">
        <Link
          href="/"
          aria-current={active === "home" ? "page" : undefined}
          className={active === "home" ? "site-home is-active" : "site-home"}
        >
          Home
        </Link>
        {navigation.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            aria-current={active === item.id ? "page" : undefined}
            className={active === item.id ? "is-active" : undefined}
            {...("external" in item
              ? { target: "_blank", rel: "me noopener noreferrer" }
              : {})}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
