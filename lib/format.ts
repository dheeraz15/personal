export function formatEssayDate(date: string, compact = false) {
  return new Intl.DateTimeFormat("en-US", {
    month: compact ? "short" : "long",
    day: "numeric",
    ...(compact ? {} : { year: "numeric" as const }),
    timeZone: "UTC",
  }).format(new Date(date));
}

export function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
