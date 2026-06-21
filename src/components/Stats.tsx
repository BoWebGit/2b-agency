"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useLanguage } from "@/i18n/LanguageProvider";

function StatItem({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { ref, value } = useCountUp<HTMLSpanElement>(target);
  return (
    <div className="stat">
      <span className="stat-num" ref={ref}>
        {value}
        {suffix ? (
          <span
            className={`stat-suffix${suffix === "%" ? " is-percent" : ""}`}
          >
            {suffix}
          </span>
        ) : null}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/** Four count-up stats (0 -> target on scroll into view), see useCountUp. */
export function Stats() {
  const { t } = useLanguage();

  return (
    <section className="stats" id="stats" aria-label="2b in numbers">
      <div className="container">
        <div className="stats-grid">
          {t.stats.items.map((item) => (
            <StatItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
