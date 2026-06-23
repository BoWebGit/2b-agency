"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowIconThin } from "./icons";

interface CaseCardProps {
  slot: string;
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  cat: string;
  title: string;
}

/**
 * Ports a single `.case-card`, now linking through to `/cases/[slug]`
 * instead of the homepage `#contacts` anchor. The `case-N.png` source
 * images do not currently exist on disk - the original's inline
 * `onerror` swaps in a branded gradient fallback with a "2b" wordmark
 * (`.case-media.case-fallback`); this re-implements that exact fallback
 * via Next/Image's `onError`, no placeholder images invented.
 */
export function CaseCard({
  slot,
  href,
  src,
  alt,
  width,
  height,
  cat,
  title,
}: CaseCardProps) {
  const [failed, setFailed] = useState(false);

  return (
    <Link className={`case-card ${slot}`} href={href}>
      <div className={`case-media${failed ? " case-fallback" : ""}`}>
        {!failed && (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <div className="case-info">
        <span className="case-cat">{cat}</span>
        <h3 className="case-title">{title}</h3>
        <span className="case-arrow" aria-hidden="true">
          <ArrowIconThin width={22} height={22} />
        </span>
      </div>
    </Link>
  );
}
