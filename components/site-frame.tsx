import type { ReactNode } from "react";

type SiteFrameProps = {
  children: ReactNode;
  tone?: "dark" | "about" | "not-found";
};

export function SiteFrame({ children, tone = "dark" }: SiteFrameProps) {
  return (
    <div className="site-frame min-h-screen" data-tone={tone}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="site-canvas mx-auto min-h-screen w-full max-w-[76rem] px-16 py-16 max-[640px]:px-6 max-[640px]:py-4">
        {children}
      </div>
    </div>
  );
}
