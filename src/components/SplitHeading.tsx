"use client";

import { useSplitReveal } from "@/hooks/useSplitReveal";

/**
 * Ports `[data-split]` section headings (§7.3): each line is its own
 * `.line > span` so it reveals independently once the heading scrolls
 * into view. Pass one or two lines for headings split across rows.
 */
export function SplitHeading({
  as: Tag = "h2",
  id,
  lines,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  id?: string;
  lines: string[];
  className?: string;
}) {
  const ref = useSplitReveal<HTMLHeadingElement>();

  return (
    <Tag className={className} id={id} data-split ref={ref}>
      {lines.map((line, i) => (
        <span
          className="line"
          style={{ "--i": i } as React.CSSProperties}
          key={i}
        >
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
