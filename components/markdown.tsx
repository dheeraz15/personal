import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { imageSize } from "image-size";

type MarkdownProps = {
  children: string;
  className?: string;
  /** Public path the content's relative image links resolve against, e.g. /essays/scrum/. */
  assetBase?: string;
};

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

const publicDirectory = path.join(process.cwd(), "public");

function resolveSource(src: string, assetBase?: string) {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) return src;
  const base = assetBase ?? "/";
  return `${base.endsWith("/") ? base : `${base}/`}${src.replace(/^\.\//, "")}`;
}

/** Width and height for a file under public/, so the page reserves the space. */
function dimensionsFor(publicSrc: string) {
  if (!publicSrc.startsWith("/")) return null;
  try {
    const file = fs.readFileSync(path.join(publicDirectory, decodeURI(publicSrc)));
    const { width, height } = imageSize(file);
    return width && height ? { width, height } : null;
  } catch {
    return null;
  }
}

function textOf(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

function isBlank(node: HastNode) {
  return node.type === "text" && !(node.value ?? "").trim();
}

export function Markdown({ children, className = "", assetBase }: MarkdownProps) {
  // The first image on a page is usually the largest thing above the fold, so
  // it loads eagerly. Everything after it waits until it is near the viewport.
  const firstImageSrc = children.match(/!\[[^\]]*\]\(\s*([^)\s]+)/)?.[1];

  function renderImage(src: string, alt: string) {
    const resolved = resolveSource(src, assetBase);
    const size = dimensionsFor(resolved);
    const isFirst = src === firstImageSrc;

    if (!size) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={resolved} alt={alt} loading="lazy" decoding="async" />;
    }

    return (
      <Image
        src={resolved}
        alt={alt}
        width={size.width}
        height={size.height}
        sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) 60vw, 704px"
        loading={isFirst ? "eager" : "lazy"}
        fetchPriority={isFirst ? "high" : "auto"}
      />
    );
  }

  const components: Components = {
    a: ({ href, children: linkChildren, node, ...props }) => {
      void node;
      const external = href?.startsWith("http");
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...props}
        >
          {linkChildren}
        </a>
      );
    },

    // Medium exported each image and its credit line as a single paragraph, which
    // rendered the credit inline beside the picture. A paragraph that starts with
    // an image becomes a figure, and whatever follows the image is its caption.
    p: ({ node, children: paragraphChildren }) => {
      const hast = node as unknown as HastNode | undefined;
      const kids = (hast?.children ?? []).filter((child) => !isBlank(child));
      const first = kids[0];

      if (first?.type === "element" && first.tagName === "img") {
        const rest = kids.slice(1);
        const caption = rest.map(textOf).join("").trim();
        const src = String(first.properties?.src ?? "");
        const rawAlt = String(first.properties?.alt ?? "");
        const alt = rawAlt && rawAlt !== "image" ? rawAlt : caption;

        const childArray = Array.isArray(paragraphChildren)
          ? (paragraphChildren as ReactNode[])
          : [paragraphChildren];
        const captionNodes = childArray.slice(1);

        return (
          <figure className="figure">
            {renderImage(src, alt)}
            {caption ? <figcaption>{captionNodes}</figcaption> : null}
          </figure>
        );
      }

      return <p>{paragraphChildren}</p>;
    },

    img: ({ src, alt }) => renderImage(String(src ?? ""), alt === "image" ? "" : alt ?? ""),
  };

  return (
    <div className={`markdown ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
