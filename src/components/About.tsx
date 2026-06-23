"use client";

import { Fragment } from "react";
import { useTextFill } from "@/hooks/useTextFill";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Ports the about section (§6.3): scroll text-fill statement, gray -> charcoal left to right. */
export function About() {
  const { t } = useLanguage();
  const ref = useTextFill<HTMLHeadingElement>(t.about.words.join(" "));

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="container">
        <h2
          className="about-fill"
          id="about-title"
          data-fill
          data-fill-words
          ref={ref}
        >
          {t.about.words.map((word, i) => (
            <Fragment key={i}>
              <span className="word" data-fill-text={word}>
                {word}
              </span>
              {i < t.about.words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h2>
      </div>
    </section>
  );
}
