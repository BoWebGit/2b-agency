"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePreloader } from "@/hooks/usePreloader";

/**
 * Ports script.js section "2. PRELOADER" + the matching markup in
 * index.html: counter 0->100 with a progress bar, then slides up
 * (`is-done`) once finished. Calls `onDone` once, exactly like the
 * original's `finishPreloader()` triggering the hero reveal. After the
 * 750ms slide-up transition (skipped for reduced motion) the element is
 * unmounted, mirroring the original's `display:none`.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const { count, done, reducedMotion } = usePreloader();
  const [removed, setRemoved] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    if (!done || calledRef.current) return;
    calledRef.current = true;
    onDone();

    if (reducedMotion) {
      setRemoved(true);
    } else {
      const t = setTimeout(() => setRemoved(true), 750);
      return () => clearTimeout(t);
    }
  }, [done, onDone, reducedMotion]);

  if (removed) return null;

  return (
    <div className={`preloader${done ? " is-done" : ""}`} aria-hidden="true">
      <div className="preloader-inner">
        <div className="preloader-mark">
          <Image
            src="/images/logo-white.svg"
            alt="Boweb"
            width={161}
            height={36}
            priority
          />
        </div>
        <div className="preloader-bar" aria-hidden="true">
          <span className="preloader-bar-fill" style={{ width: `${count}%` }} />
        </div>
        <div className="preloader-count">
          <span>{count}</span>%
        </div>
      </div>
    </div>
  );
}
