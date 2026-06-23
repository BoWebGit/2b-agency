"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { localizedPath } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ArrowIcon } from "./icons";

/** /news/[slug]: single article - image, title, body, then prev/next nav (wraps around at the ends). */
export function NewsArticleContent({ slug }: { slug: string }) {
  const { lang, t } = useLanguage();
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
            <Link
              href={localizedPath(lang, "/news")}
              className="text-link news-article-back"
            >
              <span>{t.newsPage.back}</span>
              <ArrowIcon width={18} height={18} />
            </Link>
            <div className="news-article-meta">
              <span>{article.cat}</span>
              <span>{article.date}</span>
            </div>
            <h1 className="news-article-title">{article.title}</h1>
          </div>

          <div className="container news-article-media">
            <Image
              src={article.img}
              alt={article.title}
              width={1200}
              height={720}
              priority
            />
          </div>

          <div className="container news-article-body">
            {article.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        <nav
          className="news-article-nav container"
          aria-label="Article navigation"
        >
          <Link
            href={localizedPath(lang, `/news/${prev.slug}`)}
            className="news-article-nav-card"
          >
            <div className="news-article-nav-media">
              <Image
                src={prev.img}
                alt={prev.title}
                width={400}
                height={300}
                loading="lazy"
              />
            </div>
            <span className="news-article-nav-label">
              {t.newsPage.prevLabel}
            </span>
            <span className="news-article-nav-title">{prev.title}</span>
          </Link>
          <Link
            href={localizedPath(lang, `/news/${next.slug}`)}
            className="news-article-nav-card news-article-nav-card--next"
          >
            <div className="news-article-nav-media">
              <Image
                src={next.img}
                alt={next.title}
                width={400}
                height={300}
                loading="lazy"
              />
            </div>
            <span className="news-article-nav-label">
              {t.newsPage.nextLabel}
            </span>
            <span className="news-article-nav-title">{next.title}</span>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
