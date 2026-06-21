"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Ports script.js section "12. SCROLL TEXT-FILL" for a single `[data-fill]`
 * block: sets the `--p` custom property per `.word` as the block crosses
 * the viewport (left-to-right gray -> charcoal reveal). Reduced motion
 * leaves the final charcoal state to CSS and skips the driver entirely,
 * matching the original.
 */
export function useTextFill<T extends HTMLElement>(wordsKey?: string) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>(".word"));
    if (!words.length) return;

    let ticking = false;

    function update() {
      ticking = false;
      const vh = window.innerHeight;
      const r = el!.getBoundingClientRect();
      const start = vh * 0.82;
      const end = vh * 0.32;
      let p = (start - r.top) / (start - end + r.height);
      p = Math.max(0, Math.min(1, p));
      const n = words.length;
      const filled = p * n;
      for (let i = 0; i < n; i++) {
        const wp = Math.max(0, Math.min(1, filled - i));
        words[i]!.style.setProperty("--p", wp.toFixed(3));
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // Re-bind whenever the rendered words change (e.g. UA/EN toggle swaps
    // a different word array) so `.word` is re-queried instead of holding
    // stale references to removed nodes.
  }, [reducedMotion, wordsKey]);

  return ref;
}
