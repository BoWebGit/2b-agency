"use client";

import Image from "next/image";
import Link from "next/link";
import { localizedPath } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SplitHeading } from "./SplitHeading";

/** /news: full news/blog grid, no carousel - it's a dedicated listing page. */
export function NewsPageContent() {
  const { lang, t } = useLanguage();

  return (
    <>
      <CustomCursor />
      <Header />
      <main id="main">
        <section className="news-page">
          <div className="container">
            <header className="section-head news-page-head">
              <div>
                <p className="eyebrow">
                  <span className="dot" aria-hidden="true" />
                  <span>{t.newsPage.eyebrow}</span>
                </p>
                <SplitHeading
                  as="h1"
                  id="news-page-title"
                  lines={[t.newsPage.title]}
                  className="section-title"
                />
              </div>
              <p className="news-page-lead">{t.newsPage.lead}</p>
            </header>

            <div className="news-grid">
              {t.newsPage.items.map((item) => (
                <Link
                  key={item.slug}
                  href={localizedPath(lang, `/news/${item.slug}`)}
                  className="post news-card"
                >
                  <div className="post__media">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={400}
                      height={300}
                      loading="lazy"
                    />
                  </div>
                  <div className="post__meta">
                    <span>{item.cat}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="post__title">{item.title}</h3>
                  <p className="news-card-excerpt">{item.excerpt}</p>
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
