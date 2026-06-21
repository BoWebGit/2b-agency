"use client";

import { useCustomCursor } from "@/hooks/useCustomCursor";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Ports the custom cursor markup (§7.2): outer ring + inner dot, desktop fine-pointer only. */
export function CustomCursor() {
  const { cursorRef, ringRef, dotRef } = useCustomCursor();
  const { t } = useLanguage();

  return (
    <div className="cursor" ref={cursorRef} aria-hidden="true">
      <span className="cursor-ring" ref={ringRef}>
        <span className="cursor-label">{t.cursorLabel}</span>
      </span>
      <span className="cursor-dot" ref={dotRef} />
    </div>
  );
}
