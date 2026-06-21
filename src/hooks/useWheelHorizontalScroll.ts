"use client";

import { useEffect, useRef } from "react";

/**
 * Mouse/trackpad users on a narrow (or resized-down) desktop browser get
 * the plain swipe carousel too, but a mouse has no swipe gesture and the
 * scrollbar is hidden for looks - so vertical wheel scroll is the only
 * input they have left. This converts vertical wheel input into a
 * smooth horizontal advance by roughly one card width.
 *
 * It deliberately does NOT nudge `scrollLeft` by the raw wheel delta:
 * these carousels use `scroll-snap-type: x proximity`, and a delta much
 * smaller than the card width gets snapped straight back to where it
 * started (it isn't "close enough" to the next snap point), making the
 * scroll look completely broken. Advancing by a full step and letting
 * the browser smooth-scroll there sidesteps that entirely.
 */
export function useWheelHorizontalScroll<T extends HTMLElement>(
  skip?: () => boolean,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cooling = false;

    function onWheel(e: WheelEvent) {
      if (skip?.()) return;
      if (el!.scrollWidth <= el!.clientWidth) return;
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      const atStart = el!.scrollLeft <= 0;
      const atEnd = el!.scrollLeft + el!.clientWidth >= el!.scrollWidth - 1;
      if ((atStart && delta < 0) || (atEnd && delta > 0)) return;

      e.preventDefault();
      if (cooling) return;
      cooling = true;
      setTimeout(() => {
        cooling = false;
      }, 380);

      const step = el!.clientWidth * 0.85 * Math.sign(delta);
      el!.scrollBy({ left: step, behavior: "smooth" });
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [skip]);

  return ref;
}
