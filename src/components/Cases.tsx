"use client";

import Link from "next/link";
import { useCasesPin } from "@/hooks/useCasesPin";
import { useReveal } from "@/hooks/useReveal";
import { useWheelHorizontalScroll } from "@/hooks/useWheelHorizontalScroll";
import { localizedPath } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CaseCard } from "./CaseCard";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";
import { SplitHeading } from "./SplitHeading";

/**
 * Ports cases (§6.5): desktop pins the section and drives the horizontal
 * track via vertical scroll (useCasesPin, mirroring script.js §13);
 * touch/narrow/reduced-motion fall back to the native scroll-snap
 * carousel already defined in globals.css, with the pin driver fully
 * inactive (handled inside the hook itself).
 */
export function Cases() {
  const { lang, t } = useLanguage();
  const { wrapRef, trackRef, progressFillRef } = useCasesPin();
  const viewportRef = useWheelHorizontalScroll<HTMLDivElement>(
    () => wrapRef.current?.classList.contains("is-pinned") ?? false,
  );
  const allCasesRevealRef = useReveal<HTMLAnchorElement>();

  return (
    <section className="cases" id="cases" aria-labelledby="cases-title">
      <div className="cases-pin-wrap" ref={wrapRef}>
        <div className="cases-pin">
          <div className="container container-wide">
            <header className="section-head cases-head">
              <div>
                <Reveal as="p" className="eyebrow">
                  <span className="dot" aria-hidden="true" />
                  <span>{t.cases.eyebrow}</span>
                </Reveal>
                <SplitHeading
                  id="cases-title"
                  lines={[t.cases.title]}
                  className="section-title"
                />
              </div>
              <Link
                href={localizedPath(lang, "/cases")}
                className="text-link"
                data-reveal=""
                ref={allCasesRevealRef}
              >
                <span>{t.cases.all}</span>
                <ArrowIcon width={18} height={18} />
              </Link>
            </header>
          </div>

          <div className="case-track-viewport" ref={viewportRef}>
            <div className="case-track" ref={trackRef}>
              {t.cases.items.map((item, i) => (
                <CaseCard
                  key={item.slug}
                  slot={`case-${i + 1}`}
                  href={localizedPath(lang, `/cases/${item.slug}`)}
                  src={item.img}
                  alt={item.alt}
                  width={760}
                  height={480}
                  cat={item.cat}
                  title={item.title}
                />
              ))}
            </div>
          </div>
          <div className="case-track-progress" aria-hidden="true">
            <span ref={progressFillRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
