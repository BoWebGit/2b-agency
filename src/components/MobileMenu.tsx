"use client";

import { useEffect, useRef } from "react";
import { useHeaderOffsetScroll } from "@/hooks/useHeaderOffsetScroll";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useCalculator } from "./CalculatorProvider";
import { ArrowIcon } from "./icons";
import { LangToggle } from "./LangToggle";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Ports script.js section "7. MOBILE MENU": full-screen overlay, Esc to
 * close, focus trap + restore, body scroll lock while open.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const handleAnchorClick = useHeaderOffsetScroll();
  const { openCalculator } = useCalculator();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const menu = menuRef.current;
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      const firstLink = menu?.querySelector<HTMLElement>("a, button");
      firstLink?.focus();
    } else if (lastFocused.current) {
      lastFocused.current.focus();
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !open) return;
      const menu = menuRef.current;
      if (!menu) return;
      const focusable = menu.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable.length) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const navItems: Array<{ href: string; label: string }> = [
    { href: "/#about", label: t.nav.about },
    { href: "/#services", label: t.nav.services },
    { href: "/#cases", label: t.nav.cases },
    { href: "/#price", label: t.nav.price },
    { href: "/#blog", label: t.nav.blog },
    { href: "/#contacts", label: t.nav.contacts },
  ];

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>) {
    handleAnchorClick(e);
    onClose();
  }

  return (
    <div
      className={`mobile-menu${open ? " open" : ""}`}
      id="mobile-menu"
      aria-hidden={!open}
      ref={menuRef}
    >
      <nav className="mobile-nav" aria-label="Мобільна навігація">
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            style={{ "--i": i } as React.CSSProperties}
            onClick={handleNavClick}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div
        className="mobile-menu-foot"
        style={{ "--i": navItems.length } as React.CSSProperties}
      >
        <LangToggle />
        <button
          type="button"
          className="btn btn-primary mobile-cta"
          onClick={() => {
            onClose();
            openCalculator();
          }}
        >
          <span>{t.headerCta}</span>
          <span className="btn-ico" aria-hidden="true">
            <ArrowIcon />
          </span>
        </button>
      </div>
    </div>
  );
}
