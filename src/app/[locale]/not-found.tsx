"use client";

import Image from "next/image";
import Link from "next/link";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowIcon } from "@/components/icons";
import { localizedPath } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";

/** App Router 404. No preloader (an error page should resolve instantly), but keeps header/footer so visitors can still navigate. */
export default function NotFound() {
  const { lang, t } = useLanguage();

  return (
    <>
      <CustomCursor />
      <Header />
      <main id="main">
        <section className="not-found">
          <div className="not-found-inner container">
            <div className="not-found-art">
              <Image
                src="/images/404.png"
                alt={t.notFound.title}
                width={1536}
                height={730}
                priority
              />
            </div>
            <h1 className="not-found-title">{t.notFound.title}</h1>
            <p className="not-found-lead">{t.notFound.lead}</p>
            <Link href={localizedPath(lang, "/")} className="btn btn-primary">
              <span>{t.notFound.cta}</span>
              <span className="btn-ico" aria-hidden="true">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
