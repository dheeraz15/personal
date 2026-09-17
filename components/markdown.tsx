import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  children: string;
  className?: string;
};

export function Markdown({ children, className = "" }: MarkdownProps) {
  return (
    <div className={`markdown ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: linkChildren, ...props }) => (
            <a
              href={href}
              rel={href?.startsWith("http") ? "noopener" : undefined}
              {...props}
            >
              {linkChildren}
            </a>
          ),
          img: ({ alt, ...props }) => (
            // Article images are already optimized exports and live beside each post.
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={alt ?? ""} loading="lazy" decoding="async" {...props} />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
