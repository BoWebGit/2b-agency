"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SplitHeading } from "./SplitHeading";

/** /news: full news/blog grid, no carousel - it's a dedicated listing page. */
export function NewsPageContent() {
  const { t } = useLanguage();

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
                  id="news-page-title"
                  lines={[t.newsPage.title]}
                  className="section-title"
                />
              </div>
              <p className="news-page-lead">{t.newsPage.lead}</p>
            </header>

            <div className="news-grid">
              {t.newsPage.items.map((item) => (
                <a
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="post news-card"
                >
                  <div className="post__media">
                    <Image src={item.img} alt="" width={400} height={300} loading="lazy" />
                  </div>
                  <div className="post__meta">
                    <span>{item.cat}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="post__title">{item.title}</h3>
                  <p className="news-card-excerpt">{item.excerpt}</p>
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
