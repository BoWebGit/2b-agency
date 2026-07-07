"use client";

import { type FormEvent, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";
import { SplitHeading } from "./SplitHeading";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Ports contacts (§6.8): dark section with info/social column and a
 * floating-label form. Validation + success state mirror script.js
 * section "9. CONTACT FORM" exactly - no backend, just preventDefault.
 */
type Status = "idle" | "sending" | "success" | "error";

export function Contacts() {
  const { t } = useLanguage();
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = ["name", "email", "message"] as const;
    const nextInvalid: Record<string, boolean> = {};
    let ok = true;

    fields.forEach((name) => {
      const input = form.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      if (!input) return;
      const valid =
        name === "email"
          ? EMAIL_RE.test(input.value)
          : input.value.trim() !== "";
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

    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      budget: (form.elements.namedItem("budget") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  function clearInvalid(name: string) {
    if (invalid[name]) setInvalid((prev) => ({ ...prev, [name]: false }));
  }

  return (
    <section
      className="contacts"
      id="contacts"
      aria-labelledby="contacts-title"
    >
      <div className="container contacts__inner">
        <div className="contacts__left">
          <SplitHeading
            id="contacts-title"
            lines={[t.contacts.titleLine1, t.contacts.titleLine2]}
            className="contacts__title"
          />
          <Reveal as="p" className="contacts__lead">
            {t.contacts.lead}
          </Reveal>

          <Reveal as="div" className="contacts__info">
            <a href="mailto:hello@boweb.com.ua" className="contacts__item">
              hello@boweb.com.ua
            </a>
            <a href="tel:+380936098169" className="contacts__item">
              +38 093 609 81 69
            </a>
            <span className="contacts__item contacts__item--muted">
              {t.contacts.location}
            </span>
          </Reveal>

          <Reveal as="div" className="contacts__social">
            <a href="#" rel="noopener">
              Instagram
            </a>
            <a href="#" rel="noopener">
              Behance
            </a>
            <a href="#" rel="noopener">
              LinkedIn
            </a>
            <a href="#" rel="noopener">
              Telegram
            </a>
          </Reveal>
        </div>

        <Reveal
          as="form"
          className="contacts__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={`field${invalid.name ? " is-invalid" : ""}`}>
            <input
              type="text"
              name="name"
              id="cf-name"
              required
              placeholder=" "
              onInput={() => clearInvalid("name")}
            />
            <label htmlFor="cf-name">{t.contacts.nameLabel}</label>
          </div>
          <div className={`field${invalid.email ? " is-invalid" : ""}`}>
            <input
              type="email"
              name="email"
              id="cf-email"
              required
              placeholder=" "
              onInput={() => clearInvalid("email")}
            />
            <label htmlFor="cf-email">{t.contacts.emailLabel}</label>
          </div>
          <div className="field">
            <input type="text" name="budget" id="cf-budget" placeholder=" " />
            <label htmlFor="cf-budget">{t.contacts.budgetLabel}</label>
          </div>
          <div className={`field${invalid.message ? " is-invalid" : ""}`}>
            <textarea
              name="message"
              id="cf-message"
              rows={4}
              required
              placeholder=" "
              onInput={() => clearInvalid("message")}
            />
            <label htmlFor="cf-message">{t.contacts.messageLabel}</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block contacts__submit"
            disabled={status === "sending"}
          >
            <span>
              {status === "sending" ? t.contacts.sending : t.contacts.submit}
            </span>
            <span className="btn-ico" aria-hidden="true">
              <ArrowIcon />
            </span>
          </button>
          <p
            className={`form__note${status === "success" ? " is-success" : ""}${
              status === "error" ? " is-error" : ""
            }`}
            role={status === "error" ? "alert" : undefined}
          >
            {status === "success"
              ? t.contacts.success
              : status === "error"
                ? t.contacts.error
                : t.contacts.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
