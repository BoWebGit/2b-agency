"use client";

import Image from "next/image";
import { useState } from "react";
import { useHeaderOffsetScroll } from "@/hooks/useHeaderOffsetScroll";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useCalculator } from "./CalculatorProvider";
import { ArrowIcon } from "./icons";
import { LangToggle } from "./LangToggle";
import { MobileMenu } from "./MobileMenu";

/** Ports the header (§5.2) + hamburger + mobile menu trigger. */
export function Header() {
  const { t } = useLanguage();
  const scrolled = useHeaderScroll(40);
  const handleAnchorClick = useHeaderOffsetScroll();
  const reducedMotion = useReducedMotion();
  const { openCalculator } = useCalculator();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`} id="top">
        <div className="header-inner">
          <a
            href="/"
            className="logo"
            aria-label="2b, на головну"
            onClick={handleLogoClick}
          >
            <Image
              className="logo-img"
              src="/images/logo.png"
              alt="2b, Innovative digital agency for brands in products"
              width={186}
              height={30}
              priority
            />
          </a>

          <nav className="nav-desktop" aria-label="Головна навігація">
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
              aria-label="Відкрити меню"
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
