import Link from "next/link";
import { site } from "@/lib/site";

type SiteHeaderProps = {
  title: string;
  active: "home" | "about" | "essays";
  compact?: boolean;
};

const navigation = [
  { href: "/about/", label: "About", id: "about" },
  { href: "/essays/", label: "Essays", id: "essays" },
  { href: site.social[0].url, label: "LinkedIn", id: "linkedin", external: true },
  { href: site.social[1].url, label: "Medium", id: "medium", external: true },
] as const;

export function SiteHeader({ title, active, compact = false }: SiteHeaderProps) {
  const headerClass = compact ? "site-header site-header-compact" : "site-header site-header-hero";

  return (
    <header className={headerClass}>
      <h1 className="site-title">{title}</h1>
      <nav className="site-menu" aria-label="Primary">
        <Link
          href="/"
          aria-label="Home"
          aria-current={active === "home" ? "page" : undefined}
          className={`site-dot ${active === "home" ? "is-active" : ""}`}
        />
        {navigation.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            aria-current={active === item.id ? "page" : undefined}
            className={active === item.id ? "is-active" : undefined}
            rel={"external" in item ? "me noopener" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
