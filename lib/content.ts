import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content");
const essaysDirectory = path.join(contentDirectory, "essays");

type FrontMatter = {
  title: string;
  summary?: string;
  statement?: string;
  date?: string | Date;
  cover?: string;
  draft?: boolean;
  aliases?: string[];
};

export type Essay = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  cover?: string;
  aliases: string[];
  content: string;
  minutesToRead: number;
};

export type PageContent = {
  title: string;
  summary?: string;
  statement?: string;
  content: string;
};

export type CvRole = {
  title: string;
  period: string;
  place?: string;
};

export type CvExperience = {
  org: string;
  when: string;
  note?: string;
  url?: string;
  roles: CvRole[];
};

export type CvProject = {
  name: string;
  period: string;
  blurb: string;
  url?: string;
};

export type CvEducation = {
  org: string;
  when: string;
  title: string;
  period?: string;
};

export type Cv = {
  experience: CvExperience[];
  projects: CvProject[];
  education: CvEducation[];
};

function readMarkdown(filePath: string) {
  return matter(fs.readFileSync(filePath, "utf8"));
}

function toDateString(value: string | Date | undefined) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function loadEssay(slug: string): (Essay & { draft: boolean }) | null {
  const filePath = path.join(essaysDirectory, slug, "index.md");
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = readMarkdown(filePath);
  const frontMatter = data as FrontMatter;

  return {
    slug,
    title: frontMatter.title,
    summary: frontMatter.summary ?? "",
    date: toDateString(frontMatter.date),
    cover: frontMatter.cover,
    aliases: frontMatter.aliases ?? [],
    content,
    minutesToRead: Math.max(1, Math.ceil(readingTime(content).minutes)),
    draft: frontMatter.draft ?? false,
  };
}

function publishedEssay(essay: Essay & { draft: boolean }): Essay {
  return {
    slug: essay.slug,
    title: essay.title,
    summary: essay.summary,
    date: essay.date,
    cover: essay.cover,
    aliases: essay.aliases,
    content: essay.content,
    minutesToRead: essay.minutesToRead,
  };
}

export function getAllEssays(): Essay[] {
  if (!fs.existsSync(essaysDirectory)) return [];

  return fs
    .readdirSync(essaysDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => loadEssay(entry.name))
    .filter(
      (essay): essay is Essay & { draft: boolean } =>
        Boolean(essay && !essay.draft && essay.date),
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(publishedEssay);
}

export function getEssay(slug: string): Essay | null {
  const essay = loadEssay(slug);
  if (!essay || essay.draft || !essay.date) return null;
  return publishedEssay(essay);
}

export function getPageContent(filename: "_index.md" | "about.md"): PageContent {
  const { data, content } = readMarkdown(path.join(contentDirectory, filename));
  const frontMatter = data as FrontMatter;
  return {
    title: frontMatter.title,
    summary: frontMatter.summary,
    statement: frontMatter.statement,
    content,
  };
}

export function getCv(): Cv {
  const file = fs.readFileSync(path.join(process.cwd(), "data", "cv.yaml"), "utf8");
  return yaml.load(file) as Cv;
}

export function getEssayImageUrl(slug: string, image?: string) {
  if (!image) return undefined;
  return `/essays/${slug}/${image.replace(/^\.\//, "")}`;
}
