"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { useWheelHorizontalScroll } from "@/hooks/useWheelHorizontalScroll";
import { type Locale, localizedPath } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ArrowIcon } from "./icons";
import { SplitHeading } from "./SplitHeading";

/** Ports blog (§6.7): 3-post grid. */
export function Blog() {
  const { lang, t } = useLanguage();
  const gridRef = useWheelHorizontalScroll<HTMLDivElement>();
  const allPostsRevealRef = useReveal<HTMLAnchorElement>();

  return (
    <section className="blog" id="blog" aria-labelledby="blog-title">
      <div className="container">
        <header className="section-head blog-head">
          <SplitHeading
            id="blog-title"
            lines={[t.blog.titleLine1, t.blog.titleLine2]}
            className="section-title"
          />
          <Link
            href={localizedPath(lang, "/news")}
            className="text-link"
            data-reveal=""
            ref={allPostsRevealRef}
          >
            <span>{t.blog.all}</span>
            <ArrowIcon width={18} height={18} />
          </Link>
        </header>

        <div className="blog__grid" ref={gridRef}>
          {t.blog.posts.map((post, i) => (
            <BlogPostCard key={post.slug} post={post} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BlogPost {
  slug: string;
  cat: string;
  date: string;
  title: string;
  link: string;
  img: string;
}

function BlogPostCard({
  post,
  index,
  lang,
}: {
  post: BlogPost;
  index: number;
  lang: Locale;
}) {
  const ref = useReveal<HTMLAnchorElement>();

  return (
    <Link
      href={localizedPath(lang, `/news/${post.slug}`)}
      className="post"
      data-reveal=""
      style={{ "--i": index } as React.CSSProperties}
      ref={ref}
    >
      <div className="post__media">
        <Image
          src={post.img}
          alt={post.title}
          width={400}
          height={300}
          loading="lazy"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 380px"
        />
      </div>
      <div className="post__meta">
        <span>{post.cat}</span>
        <span>{post.date}</span>
      </div>
      <h3 className="post__title">{post.title}</h3>
      <span className="post__link">{post.link}</span>
    </Link>
  );
}
