"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { localizedPath } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SplitHeading } from "./SplitHeading";

function CaseTileMedia({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`case-media${failed ? " case-fallback" : ""}`}>
      {!failed && (
        <Image
          src={src}
          alt={alt}
          width={600}
          height={400}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

/** /cases: full case grid with client-side category filtering. */
export function CasesPageContent() {
  const { lang, t } = useLanguage();
  const [active, setActive] = useState<string>("all");

  const filterKeys = Object.keys(t.casesPage.filters) as Array<
    keyof typeof t.casesPage.filters
  >;

  const items = useMemo(() => {
    if (active === "all") return t.cases.items;
    return t.cases.items.filter((item) => item.categories.includes(active));
  }, [active, t.cases.items]);

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
                  as="h1"
                  id="cases-page-title"
                  lines={[t.casesPage.title]}
                  className="section-title"
                />
              </div>
              <p className="cases-page-lead">{t.casesPage.lead}</p>
            </header>

            <div
              className="cases-filter"
              role="group"
              aria-label="Filter cases by category"
            >
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
                <Link
                  key={item.slug}
                  href={localizedPath(lang, `/cases/${item.slug}`)}
                  className="case-tile"
                >
                  <CaseTileMedia src={item.img} alt={item.alt} />
                  <div className="case-info">
                    <span className="case-cat">{item.cat}</span>
                    <h3 className="case-title">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
