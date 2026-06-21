"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Ports script.js section "4. SECTION HEADING TEXT REVEAL": adds
 * `is-revealed` to a `[data-split]` heading once it scrolls into view
 * (threshold 0.2). The hero `<h1>` is handled separately by the
 * preloader exit (see useHeroReveal), exactly like the original where
 * `#hero-title` is filtered out of this observer's target list.
 */
export function useSplitReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      el.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return ref;
}
