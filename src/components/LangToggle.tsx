"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/** Ports the 2-segment language pill (§5.3) used in header, mobile menu and footer. */
export function LangToggle({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`lang${dark ? " lang-dark" : ""}`}
      role="group"
      aria-label="Language / Мова"
      data-active={lang}
    >
      <span className="lang-slider" aria-hidden="true" />
      <button
        type="button"
        className={`lang-btn${lang === "uk" ? " is-active" : ""}`}
        aria-pressed={lang === "uk"}
        onClick={() => setLang("uk")}
      >
        UA
      </button>
      <button
        type="button"
        className={`lang-btn${lang === "en" ? " is-active" : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}
