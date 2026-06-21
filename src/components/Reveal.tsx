"use client";

import { useReveal } from "@/hooks/useReveal";

/**
 * Generic wrapper that ports `[data-reveal]` (§7.4 scroll reveal for
 * content blocks). `as` lets callers render the right tag (div/p/a/...)
 * while keeping the same observer-driven `in` class behavior.
 */
export function Reveal<T extends keyof React.JSX.IntrinsicElements = "div">({
  as,
  index,
  className,
  children,
  ...rest
}: {
  as?: T;
  index?: number;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">) {
  const Tag = (as ?? "div") as React.ElementType;
  const ref = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={
        index !== undefined
          ? ({ "--i": index } as React.CSSProperties)
          : undefined
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
