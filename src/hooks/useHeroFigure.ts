"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Desktop-only interactive life for the hero figure, driven by a single
 * rAF loop that owns the image's inline transform/filter (so it never
 * fights the container's CSS entrance reveal, which lives on the parent):
 *
 *  - cursor parallax: the figure eases toward the pointer with a subtle
 *    tilt, so it feels like the cursor nudges it;
 *  - scroll depth: as the page scrolls down through the hero, the figure
 *    zooms in and blurs, dissolving as it leaves the viewport.
 *
 * Gated to fine-pointer wide screens and disabled for reduced motion.
 */
export function useHeroFigure<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const wideEnough = window.matchMedia("(min-width: 769px)").matches;
    const current = ref.current;
    if (!finePointer || !wideEnough || reducedMotion || !current) return;

    const el: T = current;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let scrollScale = 1;
    let scrollBlur = 0;
    let rafId = 0;

    function computeScroll() {
      // 0 at the top, 1 after one viewport of scrolling: zoom up to +16%
      // and blur up to 9px as the hero scrolls away underneath the fold.
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      scrollScale = 1 + progress * 0.16;
      scrollBlur = progress * 9;
    }

    function frame() {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      const tilt = (curX / 16) * 1.6; // subtle rotate that tracks the cursor
      el.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0) scale(${scrollScale.toFixed(3)}) rotate(${tilt.toFixed(2)}deg)`;
      el.style.filter = scrollBlur > 0.05 ? `blur(${scrollBlur.toFixed(2)}px)` : "";
      rafId = window.requestAnimationFrame(frame);
    }

    function onMouseMove(e: MouseEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * 14;
      targetY = ((e.clientY - cy) / cy) * 14;
    }

    function onScroll() {
      computeScroll();
    }

    computeScroll();
    rafId = window.requestAnimationFrame(frame);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      el.style.transform = "";
      el.style.filter = "";
    };
  }, [reducedMotion]);

  return ref;
}
