"use client";

import { useHeaderOffsetScroll } from "@/hooks/useHeaderOffsetScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Ports the footer (§6.9): brand + nav + bottom row. Year is computed client-side, same as the original. */
export function Footer() {
  const { t } = useLanguage();
  const handleAnchorClick = useHeaderOffsetScroll();
  const reducedMotion = useReducedMotion();
  const year = new Date().getFullYear();

  const navItems: Array<{ href: string; label: string }> = [
    { href: "/#about", label: t.nav.about },
    { href: "/#services", label: t.nav.services },
    { href: "/#cases", label: t.nav.cases },
    { href: "/#price", label: t.nav.price },
    { href: "/#blog", label: t.nav.blog },
    { href: "/#contacts", label: t.nav.contacts },
  ];

  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <footer className="site-footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a
            href="/"
            className="footer__logo"
            aria-label="2b, нагору"
            onClick={handleLogoClick}
          >
            2b
          </a>
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
          © <span>{year}</span> 2b agency
        </span>
        <span>{t.footer.madeIn}</span>
      </div>
    </footer>
  );
}
