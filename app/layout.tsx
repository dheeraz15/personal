import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  keywords: [
    "Dhiraj Chapagain",
    "product manager",
    "product management",
    "Kathmandu",
    "Nepal",
    "essays",
    "startups",
    "leadership",
  ],
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
  openGraph: {
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
    locale: site.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    site: site.twitterHandle,
    creator: site.twitterHandle,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#333333" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
