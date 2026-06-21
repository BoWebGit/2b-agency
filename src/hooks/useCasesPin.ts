"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Drives the cases section's vertical-scroll-driven horizontal pin.
 * Desktop/fine-pointer/no-touch only (min-width: 900px, hover:hover,
 * pointer:fine, and navigator.maxTouchPoints === 0); everything else
 * (touch, narrow, reduced-motion) gets the plain swipeable scroll-snap
 * carousel that's the CSS default in globals.css. This hook is the only
 * thing that decides which mode is active - it toggles `.is-pinned` on
 * the wrapper rather than letting CSS guess independently via its own
 * media query, so the two can't disagree (e.g. on a touch laptop that
 * still reports hover:hover/pointer:fine). `disable()` mirrors `enable()`
 * so no inline px sizing/pin height is ever left behind when switching.
 */
export function useCasesPin() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const wrapEl = wrapRef.current;
    const trackEl = trackRef.current;
    const progressFill = progressFillRef.current;
    if (!wrapEl || !trackEl) return;

    const viewportEl = trackEl.parentElement;
    if (!viewportEl) return;

    // Re-bind as definitely-typed consts: TypeScript can't narrow
    // `wrapRef.current`-style locals across the nested function
    // declarations below (sizeCards, measure, render...), so closures
    // need a binding TS already knows is non-null at every call site.
    const wrap: HTMLDivElement = wrapEl;
    const track: HTMLDivElement = trackEl;
    const viewport: HTMLElement = viewportEl;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".case-card"));
    const enabledQuery = window.matchMedia(
      "(min-width: 900px) and (hover: hover) and (pointer: fine)",
    );
    // Some hybrid Windows touch devices report hover:hover/pointer:fine
    // even when used by touch (a precision trackpad on the same machine
    // makes that the "primary" pointer per spec). The pinned-scroll pan
    // is a poor fit for touch either way, so explicitly rule it out
    // instead of trusting the pointer media features alone.
    const isTouchDevice =
      typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;

    let active = false;
    let travel = 0;
    let pinTicking = false;

    function sizeCards() {
      const firstInfo = track.querySelector(".case-info");
      const infoH = firstInfo ? firstInfo.getBoundingClientRect().height : 0;
      const infoMarginTop = firstInfo
        ? parseFloat(getComputedStyle(firstInfo).marginTop) || 0
        : 0;
      let availH = viewport.clientHeight - infoH - infoMarginTop;
      availH = Math.max(220, availH);

      const ratio = 16 / 10; // keep in sync with .case-media aspect-ratio in globals.css
      let mediaW = availH * ratio;
      const maxW = window.innerWidth * 0.62; // keep at least ~1.3 cards visible per screen
      if (mediaW > maxW) {
        mediaW = maxW;
        availH = mediaW / ratio;
      }

      cards.forEach((card) => {
        const media = card.querySelector<HTMLElement>(".case-media");
        card.style.width = mediaW + "px";
        if (media) {
          media.style.width = mediaW + "px";
          media.style.height = availH + "px";
        }
      });
    }

    function measure() {
      sizeCards();
      travel = Math.max(0, track.scrollWidth - wrap.clientWidth);
      wrap.style.height = window.innerHeight + travel + "px";
    }

    function render() {
      pinTicking = false;
      if (!active) return;
      const rect = wrap.getBoundingClientRect();
      let progress = travel > 0 ? -rect.top / travel : 0;
      progress = Math.max(0, Math.min(1, progress));
      track.style.transform = `translate3d(${(-progress * travel).toFixed(1)}px,0,0)`;
      if (progressFill)
        progressFill.style.width = (progress * 100).toFixed(1) + "%";
    }

    function onScroll() {
      if (!pinTicking) {
        pinTicking = true;
        window.requestAnimationFrame(render);
      }
    }

    function remeasure() {
      if (!active) return;
      measure();
      render();
    }

    function enable() {
      if (active || reducedMotion) return;
      active = true;
      wrap.classList.add("is-pinned");
      measure();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", measure, { passive: true });
      render();

      // The fonts load via a <link>, not next/font, so a font swap after
      // this initial measurement can resize .case-info (and therefore the
      // computed card height/travel) without firing a "resize" event -
      // re-measure once fonts and any case images settle so the track's
      // scrollable distance stays in sync with what's actually rendered.
      if (typeof document !== "undefined" && "fonts" in document) {
        document.fonts.ready.then(remeasure);
      }
      window.addEventListener("load", remeasure);
    }

    function disable() {
      if (!active) return;
      active = false;
      wrap.classList.remove("is-pinned");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", remeasure);
      wrap.style.height = "";
      track.style.transform = "";
      if (progressFill) progressFill.style.width = "0%";
      cards.forEach((card) => {
        const media = card.querySelector<HTMLElement>(".case-media");
        card.style.width = "";
        if (media) {
          media.style.width = "";
          media.style.height = "";
        }
      });
    }

    function sync() {
      if (enabledQuery.matches && !reducedMotion && !isTouchDevice) enable();
      else disable();
    }

    sync();
    enabledQuery.addEventListener("change", sync);

    return () => {
      enabledQuery.removeEventListener("change", sync);
      disable();
    };
  }, [reducedMotion]);

  return { wrapRef, trackRef, progressFillRef };
}
