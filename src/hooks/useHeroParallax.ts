"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Ports script.js section "11. HERO SCULPTURE PARALLAX": subtle eased
 * shift of the hero art toward the cursor, layered on top of the CSS
 * idle float. Desktop fine-pointer only, disabled for reduced motion.
 */
export function useHeroParallax<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const current = ref.current;
    if (!finePointer || reducedMotion || !current) return;

    // Definitely-typed rebind: TypeScript can't narrow `ref.current`
    // across the nested `renderParallax` closure below.
    const el: T = current;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let rafId = 0;
    let active = false;

    function renderParallax() {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      el.style.transform = `translate(${curX.toFixed(2)}px,${curY.toFixed(2)}px)`;
      if (active) rafId = window.requestAnimationFrame(renderParallax);
    }

    function onMouseMove(e: MouseEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * 12;
      targetY = ((e.clientY - cy) / cy) * 12;
      if (!rafId) {
        active = true;
        rafId = window.requestAnimationFrame(renderParallax);
      }
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      active = false;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [reducedMotion]);

  return ref;
}
