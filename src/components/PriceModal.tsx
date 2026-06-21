"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ArrowIcon, CloseIcon } from "./icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface TierInfo {
  name: string;
  price: string;
}

interface PriceModalProps {
  tier: TierInfo | null;
  onClose: () => void;
}

/**
 * Popup shown when a price tier's CTA is clicked: a short request form
 * scoped to that plan, instead of just scrolling to the shared contact
 * form. Same overlay shell and a11y pattern as ServiceModal (Esc to
 * close, focus trap + restore, body scroll lock).
 */
export function PriceModal({ tier, onClose }: PriceModalProps) {
  const { t } = useLanguage();
  const open = tier !== null;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);

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
    if (!open) setSuccess(false);
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
        "a[href], button:not([disabled]), input, textarea",
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = ["name", "email"] as const;
    const nextInvalid: Record<string, boolean> = {};
    let ok = true;

    fields.forEach((name) => {
      const input = form.elements.namedItem(name) as HTMLInputElement | null;
      if (!input) return;
      const valid =
        name === "email" ? EMAIL_RE.test(input.value) : input.value.trim() !== "";
      nextInvalid[name] = !valid;
      if (!valid) ok = false;
    });

    setInvalid(nextInvalid);

    if (!ok) {
      const firstBadName = fields.find((f) => nextInvalid[f]);
      if (firstBadName) {
        const el = form.elements.namedItem(firstBadName) as HTMLElement | null;
        el?.focus();
      }
      return;
    }

    setSuccess(true);
    form.reset();
  }

  function clearInvalid(name: string) {
    if (invalid[name]) setInvalid((prev) => ({ ...prev, [name]: false }));
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
        aria-label={tier?.name}
      >
        <button
          type="button"
          className="service-modal-close"
          aria-label="Закрити"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        {tier && (
          <>
            <span className="service-modal-idx">{t.price.requestFor}</span>
            <h3 className="service-modal-title">{tier.name}</h3>
            <p className="service-modal-desc">{tier.price}</p>

            <form className="contacts__form" onSubmit={handleSubmit} noValidate>
              <div className={`field${invalid.name ? " is-invalid" : ""}`}>
                <input
                  type="text"
                  name="name"
                  id="pf-name"
                  required
                  placeholder=" "
                  onInput={() => clearInvalid("name")}
                />
                <label htmlFor="pf-name">{t.contacts.nameLabel}</label>
              </div>
              <div className={`field${invalid.email ? " is-invalid" : ""}`}>
                <input
                  type="email"
                  name="email"
                  id="pf-email"
                  required
                  placeholder=" "
                  onInput={() => clearInvalid("email")}
                />
                <label htmlFor="pf-email">{t.contacts.emailLabel}</label>
              </div>
              <div className="field">
                <textarea name="message" id="pf-message" rows={3} placeholder=" " />
                <label htmlFor="pf-message">{t.contacts.messageLabel}</label>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                <span>{t.contacts.submit}</span>
                <span className="btn-ico" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </button>
              <p className={`form__note${success ? " is-success" : ""}`}>
                {success ? t.contacts.success : t.contacts.note}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
