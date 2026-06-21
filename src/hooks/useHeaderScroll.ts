"use client";

import { useEffect, useState } from "react";

/** Ports script.js section "3. HEADER SCROLL STATE" (rAF-throttled scroll listener). */
export function useHeaderScroll(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    function update() {
      setScrolled(window.scrollY > threshold);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
