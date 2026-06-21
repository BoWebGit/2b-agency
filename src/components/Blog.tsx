"use client";

import Image from "next/image";
import { useWheelHorizontalScroll } from "@/hooks/useWheelHorizontalScroll";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";
import { SplitHeading } from "./SplitHeading";

/** Ports blog (§6.7): 3-post grid. */
export function Blog() {
  const { t } = useLanguage();
  const gridRef = useWheelHorizontalScroll<HTMLDivElement>();

  return (
    <section className="blog" id="blog" aria-labelledby="blog-title">
      <div className="container">
        <header className="section-head blog-head">
          <SplitHeading
            id="blog-title"
            lines={[t.blog.titleLine1, t.blog.titleLine2]}
            className="section-title"
          />
          <Reveal as="a" href="/news" className="btn btn-outline blog-all">
            <span>{t.blog.all}</span>
            <span className="btn-ico" aria-hidden="true">
              <ArrowIcon />
            </span>
          </Reveal>
        </header>

        <div className="blog__grid" ref={gridRef}>
          {t.blog.posts.map((post, i) => (
            <Reveal
              as="a"
              key={post.slug}
              href={`/news/${post.slug}`}
              className="post"
              index={i}
            >
              <div className="post__media">
                <Image
                  src={post.img}
                  alt=""
                  width={400}
                  height={300}
                  loading="lazy"
                />
              </div>
              <div className="post__meta">
                <span>{post.cat}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="post__title">{post.title}</h3>
              <span className="post__link">{post.link}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
