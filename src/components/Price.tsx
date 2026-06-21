"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ArrowIcon } from "./icons";
import { PriceModal } from "./PriceModal";
import { Reveal } from "./Reveal";
import { SplitHeading } from "./SplitHeading";

/**
 * Ports price (§6.6): six editorial stacked tier rows, one featured.
 * Every tier's CTA shares one label and opens a request popup scoped to
 * that plan, instead of mixing "Обрати"/"Обговорити" and silently
 * scrolling to the shared contact form.
 */
export function Price() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="price" id="price" aria-labelledby="price-title">
      <div className="container">
        <header className="section-head price-head">
          <div>
            <Reveal as="p" className="eyebrow">
              <span className="dot" aria-hidden="true" />
              <span>{t.price.eyebrow}</span>
            </Reveal>
            <SplitHeading
              id="price-title"
              lines={[t.price.title]}
              className="section-title"
            />
          </div>
          <Reveal as="p" className="price-lead">
            {t.price.lead}
          </Reveal>
        </header>

        <div className="price-list">
          {t.price.tiers.map((tier, i) => (
            <Reveal
              as="div"
              key={tier.name}
              index={i}
              className={`price-tier${tier.featured ? " price-tier-featured" : ""}`}
            >
              {tier.featured && tier.chip && (
                <span className="tier-chip">{tier.chip}</span>
              )}
              <div className="tier-id">
                <h3 className="tier-name">{tier.name}</h3>
                <p className="tier-for">{tier.forWhom}</p>
              </div>
              <div className="tier-body">
                <p className="tier-price">{tier.price}</p>
                <ul className="tier-features">
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="tier-action">
                <button
                  type="button"
                  className={`btn ${tier.featured ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setOpenIdx(i)}
                >
                  <span>{t.price.cta}</span>
                  <span className="btn-ico" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <PriceModal
        tier={openIdx !== null ? t.price.tiers[openIdx]! : null}
        onClose={() => setOpenIdx(null)}
      />
    </section>
  );
}
