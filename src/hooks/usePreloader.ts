"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Ports script.js section "2. PRELOADER": counts 0->100 over ~1.4s via rAF
 * (easeOutQuad), then signals `done` so the curtain can slide up and the
 * hero text reveal can fire. Reduced motion skips straight to the end.
 */
export function usePreloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const reducedMotion = useReducedMotion();
  // capture the reduced-motion value synchronously so effect below doesn't
  // need to wait an extra render before deciding which path to take.
  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (reducedMotionRef.current) {
      setCount(100);
      setDone(true);
      document.body.style.overflow = "";
      return;
    }

    const duration = 1400;
    let start: number | null = null;
    let rafId = 0;
    let holdTimeout = 0;

    function step(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - p) ** 2; // easeOutQuad
      const value = Math.round(eased * 100);
      setCount(value);
      if (p < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        holdTimeout = window.setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 120);
      }
    }
    rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(holdTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { count, done, reducedMotion };
}
