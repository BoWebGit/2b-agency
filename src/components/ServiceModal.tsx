"use client";

import { useEffect, useRef } from "react";
import { useHeaderOffsetScroll } from "@/hooks/useHeaderOffsetScroll";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ArrowIcon, CloseIcon } from "./icons";

interface ServiceInfo {
  idx: string;
  name: string;
  desc: string;
  features: string[];
}

interface ServiceModalProps {
  service: ServiceInfo | null;
  onClose: () => void;
}

/**
 * Popup shown when a service row is clicked: what's included plus a CTA
 * into the contact form. Mirrors MobileMenu's a11y pattern (Esc to
 * close, focus trap + restore, body scroll lock) since both are
 * overlays over the same page.
 */
export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const { t } = useLanguage();
  const open = service !== null;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const handleAnchorClick = useHeaderOffsetScroll();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const modal = modalRef.current;
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      modal?.querySelector<HTMLElement>(".service-modal-close")?.focus();
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
      const modal = modalRef.current;
      if (!modal) return;
      const focusable = modal.querySelectorAll<HTMLElement>(
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

  function handleCtaClick(e: React.MouseEvent<HTMLAnchorElement>) {
    handleAnchorClick(e);
    onClose();
  }

  return (
    <div
      className={`service-modal-overlay${open ? " open" : ""}`}
      aria-hidden={!open}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="service-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={service?.name}
      >
        <button
          type="button"
          className="service-modal-close"
          aria-label="Закрити"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        {service && (
          <>
            <span className="service-modal-idx">{service.idx}</span>
            <h3 className="service-modal-title">{service.name}</h3>
            <p className="service-modal-desc">{service.desc}</p>
            <ul className="service-modal-features">
              {service.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a
              href="/#contacts"
              className="btn btn-primary btn-block"
              onClick={handleCtaClick}
            >
              <span>{t.headerCta}</span>
              <span className="btn-ico" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </>
        )}
      </div>
    </div>
  );
}
