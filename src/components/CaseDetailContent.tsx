"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { localizedPath } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ArrowIcon } from "./icons";

function CaseDetailMedia({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`case-media${failed ? " case-fallback" : ""}`}>
      {!failed && (
        <Image
          src={src}
          alt={alt}
          width={1140}
          height={641}
          priority
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

/** /cases/[slug]: single case study - cat, title, lead, external "visit site" CTA, meta grid, description. */
export function CaseDetailContent({ slug }: { slug: string }) {
  const { lang, t } = useLanguage();
  const item = t.cases.items.find((c) => c.slug === slug);

  if (!item) notFound();

  return (
    <>
      <CustomCursor />
      <Header />
      <main id="main">
        <article className="case-detail">
          <div className="container case-detail-head">
            <Link
              href={localizedPath(lang, "/cases")}
              className="text-link case-detail-back"
            >
              <span>{t.casesPage.back}</span>
              <ArrowIcon width={18} height={18} />
            </Link>
            <span className="case-detail-cat">{item.cat}</span>
            <h1 className="case-detail-title">{item.title}</h1>
            <p className="case-detail-lead">{item.description}</p>
            <a
              className="btn btn-outline"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t.casesPage.visit}</span>
              <span className="btn-ico" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </div>

          <div className="container case-detail-media">
            <CaseDetailMedia src={item.img} alt={item.alt} />
          </div>

          <dl className="container case-detail-meta">
            <div className="case-detail-meta-item">
              <dt>{t.casesPage.platformLabel}</dt>
              <dd>{item.platform}</dd>
            </div>
            <div className="case-detail-meta-item">
              <dt>{t.casesPage.designLabel}</dt>
              <dd>{item.design}</dd>
            </div>
            <div className="case-detail-meta-item">
              <dt>{t.casesPage.roleLabel}</dt>
              <dd className="case-detail-roles">
                {item.roles.map((role) => (
                  <span key={role} className="case-detail-role">
                    {role}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </article>
      </main>
      <Footer />
    </>
  );
}
