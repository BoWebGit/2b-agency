"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Ports script.js section "6. COUNT-UP STATS": animates 0 -> target once
 * the element scrolls into view (threshold 0.6), easeOutCubic over
 * 1200ms. Reduced motion (or no IntersectionObserver) just shows the
 * final value immediately, same as the original.
 */
export function useCountUp<T extends HTMLElement>(target: number) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setValue(target);
      return;
    }

    const duration = 1200;
    let rafId = 0;

    function step(ts: number, start: number) {
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      setValue(Math.round(target * eased));
      if (p < 1) rafId = requestAnimationFrame((next) => step(next, start));
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rafId = requestAnimationFrame((ts) => step(ts, ts));
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, target]);

  return { ref, value };
}
