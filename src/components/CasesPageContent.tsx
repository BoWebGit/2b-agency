"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SplitHeading } from "./SplitHeading";

/** /cases: full case grid with client-side category filtering. */
export function CasesPageContent() {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>("all");

  const filterKeys = Object.keys(t.casesPage.filters) as Array<
    keyof typeof t.casesPage.filters
  >;

  const items = useMemo(() => {
    if (active === "all") return t.casesPage.items;
    return t.casesPage.items.filter((item) =>
      item.categories.includes(active),
    );
  }, [active, t.casesPage.items]);

  return (
    <>
      <CustomCursor />
      <Header />
      <main id="main">
        <section className="cases-page">
          <div className="container container-wide">
            <header className="section-head cases-page-head">
              <div>
                <p className="eyebrow">
                  <span className="dot" aria-hidden="true" />
                  <span>{t.casesPage.eyebrow}</span>
                </p>
                <SplitHeading
                  id="cases-page-title"
                  lines={[t.casesPage.title]}
                  className="section-title"
                />
              </div>
              <p className="cases-page-lead">{t.casesPage.lead}</p>
            </header>

            <div className="cases-filter" role="group" aria-label="Filter cases by category">
              <button
                type="button"
                className={`cases-filter-btn${active === "all" ? " is-active" : ""}`}
                onClick={() => setActive("all")}
              >
                {t.casesPage.filterAll}
              </button>
              {filterKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`cases-filter-btn${active === key ? " is-active" : ""}`}
                  onClick={() => setActive(key)}
                >
                  {t.casesPage.filters[key]}
                </button>
              ))}
            </div>

            <div className="case-tile-grid">
              {items.map((item) => (
                <a key={item.title} href="/#contacts" className="case-tile">
                  <div className="case-media case-fallback" aria-label={item.alt} />
                  <div className="case-info">
                    <span className="case-cat">{item.cat}</span>
                    <h3 className="case-title">{item.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
