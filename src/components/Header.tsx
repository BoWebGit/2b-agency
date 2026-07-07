"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useHeaderOffsetScroll } from "@/hooks/useHeaderOffsetScroll";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { localizedPath } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useCalculator } from "./CalculatorProvider";
import { ArrowIcon } from "./icons";
import { LangToggle } from "./LangToggle";
import { MobileMenu } from "./MobileMenu";

/** Ports the header (§5.2) + hamburger + mobile menu trigger. */
export function Header() {
  const { lang, t } = useLanguage();
  const scrolled = useHeaderScroll(40);
  const handleAnchorClick = useHeaderOffsetScroll();
  const reducedMotion = useReducedMotion();
  const { openCalculator } = useCalculator();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`} id="top">
        <div className="header-inner">
          <Link
            href={homePath}
            className="logo"
            aria-label={t.nav.homeLink}
            onClick={handleLogoClick}
          >
            <Image
              className="logo-img"
              src="/images/logo.svg"
              alt="Boweb"
              width={128}
              height={29}
              priority
            />
          </Link>

          <nav className="nav-desktop" aria-label={t.nav.mainNav}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={handleAnchorClick}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <LangToggle />

            <button
              type="button"
              className="btn btn-primary header-cta"
              onClick={openCalculator}
            >
              <span>{t.headerCta}</span>
              <span className="btn-ico" aria-hidden="true">
                <ArrowIcon />
              </span>
            </button>

            <button
              type="button"
              className={`hamburger${menuOpen ? " open" : ""}`}
              aria-label={t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
