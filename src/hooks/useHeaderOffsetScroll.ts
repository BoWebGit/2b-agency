"use client";

import { useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";

const HEADER_OFFSET = 96;

/**
 * Ports script.js section "8. SMOOTH ANCHOR SCROLL": scrolls to an in-page
 * anchor with an offset for the floating header, honoring reduced motion.
 * Returns a click handler for `<a href="#id">` or `<a href="/#id">`.
 *
 * Nav links use the `/#id` form so they still work as real navigation
 * from other pages (/cases, /news) - the browser just loads "/" and
 * jumps to the hash on its own. Only intercept the click for a smooth
 * scroll when the target hash actually exists on the CURRENT page;
 * otherwise let the link navigate normally.
 */
export function useHeaderOffsetScroll() {
  const reducedMotion = useReducedMotion();

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href) return;
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);
      const path = href.slice(0, hashIndex);
      if (path && path !== window.location.pathname) return;
      if (hash === "#" || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [reducedMotion],
  );
}
