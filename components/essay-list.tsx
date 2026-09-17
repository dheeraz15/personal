import Link from "next/link";
import type { Essay } from "@/lib/content";
import { formatEssayDate } from "@/lib/format";

export function EssayList({ essays }: { essays: Essay[] }) {
  const byYear = Map.groupBy(essays, (essay) => essay.date.slice(0, 4));

  return (
    <ol className="archive-list col-span-full m-0 list-none p-0">
      {[...byYear.entries()].map(([year, yearEssays]) => (
        <li key={year} className="archive-year">
          <h2>{year}</h2>
          <ol className="archive-entries">
            {yearEssays.map((essay) => (
              <li key={essay.slug}>
                <Link className="box-link block no-underline" href={`/essays/${essay.slug}/`}>
                  <strong className="block">{essay.title}</strong>
                  <span className="block">
                    {essay.summary}{" "}
                    <time dateTime={essay.date.slice(0, 10)}>{formatEssayDate(essay.date, true)}</time>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
