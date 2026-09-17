type ProjectLinkProps = {
  name: string;
  url?: string;
};

/** A project name, with an arrow that opens its site when it has one. */
export function ProjectLink({ name, url }: ProjectLinkProps) {
  if (!url) return <>{name}</>;

  return (
    <a
      className="box-link project-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} (opens in a new tab)`}
    >
      {name}
      <svg className="external-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path
          d="M6 3.5h6.5V10M12.5 3.5 4 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
