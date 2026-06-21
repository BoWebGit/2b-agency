"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Ports script.js section "10. CUSTOM CURSOR": outer ring lerps toward the
 * pointer, inner dot tracks instantly. Desktop fine-pointer only. Hover
 * over interactive targets grows the ring; `.case-card` swaps in the
 * localized "view" label; mousedown scales it down.
 */
export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLSpanElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!cursor || !ring || !dot) return;

    document.body.classList.add("cursor-active");

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;

    function renderRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring!.style.transform = `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`;
      rafId = window.requestAnimationFrame(renderRing);
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot!.style.transform = `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
      if (!rafId) rafId = window.requestAnimationFrame(renderRing);
    }

    function onMouseEnterHover() {
      cursor!.classList.add("is-hover");
    }
    function onMouseLeaveHover() {
      cursor!.classList.remove("is-hover");
    }
    function onMouseEnterLabel() {
      cursor!.classList.add("is-label");
      cursor!.classList.remove("is-hover");
    }
    function onMouseLeaveLabel() {
      cursor!.classList.remove("is-label");
    }
    function onMouseDown() {
      cursor!.classList.add("is-press");
    }
    function onMouseUp() {
      cursor!.classList.remove("is-press");
    }
    function onWindowLeave() {
      cursor!.style.opacity = "0";
    }
    function onWindowEnter() {
      cursor!.style.opacity = "1";
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onWindowLeave);
    document.addEventListener("mouseenter", onWindowEnter);

    const hoverTargets = document.querySelectorAll(
      "a, button, .service-row, .blog-row, .logo",
    );
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterHover);
      el.addEventListener("mouseleave", onMouseLeaveHover);
    });

    const labelTargets = document.querySelectorAll(".case-card");
    labelTargets.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLabel);
      el.addEventListener("mouseleave", onMouseLeaveLabel);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onWindowLeave);
      document.removeEventListener("mouseenter", onWindowEnter);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterHover);
        el.removeEventListener("mouseleave", onMouseLeaveHover);
      });
      labelTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLabel);
        el.removeEventListener("mouseleave", onMouseLeaveLabel);
      });
      document.body.classList.remove("cursor-active");
    };
  }, [reducedMotion]);

  return { cursorRef, ringRef, dotRef };
}
