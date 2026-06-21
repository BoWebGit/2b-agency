"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ArrowIcon } from "./icons";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** /news/[slug]: single article - image, title, body, then prev/next nav (wraps around at the ends). */
export function NewsArticleContent({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const items = t.newsPage.items;
  const index = items.findIndex((item) => item.slug === slug);

  if (index === -1) notFound();

  const article = items[index]!;
  const prev = items[(index - 1 + items.length) % items.length]!;
  const next = items[(index + 1) % items.length]!;

  return (
    <>
      <CustomCursor />
      <Header />
      <main id="main">
        <article className="news-article">
          <div className="container news-article-head">
            <a href="/news" className="text-link news-article-back">
              <span>{t.newsPage.back}</span>
              <ArrowIcon width={18} height={18} />
            </a>
            <div className="news-article-meta">
              <span>{article.cat}</span>
              <span>{article.date}</span>
            </div>
            <h1 className="news-article-title">{article.title}</h1>
          </div>

          <div className="news-article-media">
            <Image src={article.img} alt="" width={1200} height={720} priority />
          </div>

          <div className="container news-article-body">
            {article.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        <nav className="news-article-nav container" aria-label="Article navigation">
          <a href={`/news/${prev.slug}`} className="news-article-nav-card">
            <div className="news-article-nav-media">
              <Image src={prev.img} alt="" width={400} height={300} loading="lazy" />
            </div>
            <span className="news-article-nav-label">{t.newsPage.prevLabel}</span>
            <span className="news-article-nav-title">{prev.title}</span>
          </a>
          <a
            href={`/news/${next.slug}`}
            className="news-article-nav-card news-article-nav-card--next"
          >
            <div className="news-article-nav-media">
              <Image src={next.img} alt="" width={400} height={300} loading="lazy" />
            </div>
            <span className="news-article-nav-label">{t.newsPage.nextLabel}</span>
            <span className="news-article-nav-title">{next.title}</span>
          </a>
        </nav>
      </main>
      <Footer />
    </>
  );
}
