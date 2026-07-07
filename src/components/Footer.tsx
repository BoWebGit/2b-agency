"use client";

import Image from "next/image";
import Link from "next/link";
import { useHeaderOffsetScroll } from "@/hooks/useHeaderOffsetScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { localizedPath } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Ports the footer (§6.9): brand + nav + bottom row. Year is computed client-side, same as the original. */
export function Footer() {
  const { lang, t } = useLanguage();
  const handleAnchorClick = useHeaderOffsetScroll();
  const reducedMotion = useReducedMotion();
  const year = new Date().getFullYear();

  const homePath = localizedPath(lang, "/");

  const navItems: Array<{ href: string; label: string }> = [
    { href: `${homePath}#about`, label: t.nav.about },
    { href: `${homePath}#services`, label: t.nav.services },
    { href: `${homePath}#cases`, label: t.nav.cases },
    { href: `${homePath}#price`, label: t.nav.price },
    { href: `${homePath}#blog`, label: t.nav.blog },
    { href: `${homePath}#contacts`, label: t.nav.contacts },
  ];

  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname !== homePath) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <footer className="site-footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link
            href={homePath}
            className="footer__logo"
            aria-label={t.nav.backToTop}
            onClick={handleLogoClick}
          >
            <Image
              src="/images/logo-white.svg"
              alt="Boweb"
              width={161}
              height={36}
            />
          </Link>
          <p className="footer__tag">{t.footer.tag}</p>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={handleAnchorClick}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="container footer__bottom">
        <span>
          © <span>{year}</span> Boweb
        </span>
        <span>{t.footer.madeIn}</span>
      </div>
    </footer>
  );
}
