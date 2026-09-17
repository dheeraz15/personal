import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

export default function NotFound() {
  return (
    <SiteFrame tone="not-found">
      <main id="main" className="not-found-grid">
        <p>The page you are looking for does not exist.</p>
        <Link href="/">Go to the entrance of this website →</Link>
        <div aria-hidden="true">404</div>
      </main>
    </SiteFrame>
  );
}
