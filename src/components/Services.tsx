"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ArrowIconThin } from "./icons";
import { Reveal } from "./Reveal";
import { ServiceModal } from "./ServiceModal";
import { SplitHeading } from "./SplitHeading";

/**
 * Ports services (§6.4): six numbered full-width index rows, unchanged
 * visually. Clicking a row opens a popup with what's included and a CTA
 * instead of silently linking straight to the contact form, so the
 * click actually shows the client something before they decide to reach
 * out.
 */
export function Services() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      className="services"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="container">
        <header className="section-head services-head">
          <div>
            <Reveal as="p" className="eyebrow">
              <span className="dot" aria-hidden="true" />
              <span>{t.services.eyebrow}</span>
            </Reveal>
            <SplitHeading
              id="services-title"
              lines={[t.services.title]}
              className="section-title"
            />
          </div>
          <Reveal as="p" className="services-sub">
            {t.services.sub}
          </Reveal>
        </header>

        <ol className="service-list">
          {t.services.list.map((item, i) => (
            <li key={item.idx}>
              <Reveal
                as="button"
                type="button"
                className="service-row"
                index={i}
                onClick={() => setOpenIdx(i)}
              >
                <span className="service-idx">{item.idx}</span>
                <span className="service-name">{item.name}</span>
                <span className="service-desc">{item.desc}</span>
                <span className="service-arrow" aria-hidden="true">
                  <ArrowIconThin />
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <ServiceModal
        service={openIdx !== null ? t.services.list[openIdx]! : null}
        onClose={() => setOpenIdx(null)}
      />
    </section>
  );
}
