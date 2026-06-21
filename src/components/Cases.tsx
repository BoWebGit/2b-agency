"use client";

import { useCasesPin } from "@/hooks/useCasesPin";
import { useWheelHorizontalScroll } from "@/hooks/useWheelHorizontalScroll";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CaseCard } from "./CaseCard";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";
import { SplitHeading } from "./SplitHeading";

const SLOTS = ["case-1", "case-2", "case-3", "case-4"] as const;
// case-N.png files do not exist on disk yet; CaseCard's onError swap to
// the gradient "2b" fallback handles that, same as the original's inline
// onerror handler. Dimensions match the index.html width/height attrs.
const DIMENSIONS: Record<
  (typeof SLOTS)[number],
  { width: number; height: number }
> = {
  "case-1": { width: 760, height: 520 },
  "case-2": { width: 520, height: 400 },
  "case-3": { width: 520, height: 400 },
  "case-4": { width: 760, height: 430 },
};

/**
 * Ports cases (§6.5): desktop pins the section and drives the horizontal
 * track via vertical scroll (useCasesPin, mirroring script.js §13);
 * touch/narrow/reduced-motion fall back to the native scroll-snap
 * carousel already defined in globals.css, with the pin driver fully
 * inactive (handled inside the hook itself).
 */
export function Cases() {
  const { t } = useLanguage();
  const { wrapRef, trackRef, progressFillRef } = useCasesPin();
  const viewportRef = useWheelHorizontalScroll<HTMLDivElement>(
    () => wrapRef.current?.classList.contains("is-pinned") ?? false,
  );

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
              <Reveal as="a" href="/cases" className="text-link">
                <span>{t.cases.all}</span>
                <ArrowIcon width={18} height={18} />
              </Reveal>
            </header>
          </div>

          <div className="case-track-viewport" ref={viewportRef}>
            <div className="case-track" ref={trackRef}>
              {t.cases.items.map((item, i) => {
                const slot = SLOTS[i]!;
                const dims = DIMENSIONS[slot];
                return (
                  <CaseCard
                    key={slot}
                    slot={slot}
                    src={`/images/${slot}.png`}
                    alt={item.alt}
                    width={dims.width}
                    height={dims.height}
                    cat={item.cat}
                    title={item.title}
                  />
                );
              })}
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
