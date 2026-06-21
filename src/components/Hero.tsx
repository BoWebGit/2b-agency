"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useHeaderOffsetScroll } from "@/hooks/useHeaderOffsetScroll";
import { useHeroParallax } from "@/hooks/useHeroParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useCalculator } from "./CalculatorProvider";
import { ArrowIcon } from "./icons";

/**
 * Ports the hero (§6.2): two-line offset H1 (revealed by the preloader
 * exit, not the generic IntersectionObserver split-heading), lead, CTAs,
 * and the hero figure image with parallax. `heroRevealed` flips true once
 * the preloader finishes, exactly like the original's `revealHero()`.
 */
export function Hero({ heroRevealed }: { heroRevealed: boolean }) {
  const { t } = useLanguage();
  const handleAnchorClick = useHeaderOffsetScroll();
  const { openCalculator } = useCalculator();
  const parallaxRef = useHeroParallax<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);
  const revealRefs = useRef<Array<HTMLElement | null>>([]);

  // Lead + CTAs + figure fade up slightly after the headline, staggered,
  // mirroring `heroReveals.forEach` + `setTimeout` in the original.
  useEffect(() => {
    if (!heroRevealed) return;
    const timers: number[] = [];
    revealRefs.current.forEach((el, idx) => {
      if (!el) return;
      const delay = reducedMotion ? 0 : 180 + idx * 90;
      timers.push(window.setTimeout(() => el.classList.add("in"), delay));
    });
    return () => {
      for (const id of timers) window.clearTimeout(id);
    };
  }, [heroRevealed, reducedMotion]);

  function setRevealRef(idx: number) {
    return (el: HTMLElement | null) => {
      revealRefs.current[idx] = el;
    };
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow" data-reveal ref={setRevealRef(0)}>
            <span className="dot" aria-hidden="true" />
            <span>{t.hero.eyebrow}</span>
          </p>

          <h1
            className={`hero-title hero-title--offset${heroRevealed ? " is-revealed" : ""}`}
            id="hero-title"
            data-split
          >
            <span
              className="line line--left"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              <span>{t.hero.lineLeft}</span>
            </span>
            <span
              className="line line--right"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              <span>{t.hero.lineRight}</span>
            </span>
          </h1>

          <p className="hero-lead" data-reveal ref={setRevealRef(1)}>
            {t.hero.lead}
          </p>

          <div className="hero-cta" data-reveal ref={setRevealRef(2)}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={openCalculator}
            >
              <span>{t.hero.ctaPrimary}</span>
              <span className="btn-ico" aria-hidden="true">
                <ArrowIcon />
              </span>
            </button>
            <a
              href="#cases"
              className="btn btn-outline"
              onClick={handleAnchorClick}
            >
              <span>{t.hero.ctaSecondary}</span>
              <span className="btn-ico" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>

        <div
          className="hero-art"
          data-reveal
          ref={(el) => {
            setRevealRef(3)(el);
            parallaxRef.current = el;
          }}
        >
          {!imgError ? (
            <Image
              className="hero-art-img"
              src="/images/figure.png"
              alt={t.hero.figureAlt}
              width={721}
              height={880}
              priority
              onError={() => setImgError(true)}
            />
          ) : (
            <HeroSculptureFallback />
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Ported 1:1 from index.html's `.hero-sculpture` inline SVG: the abstract
 * glossy orange/white ribbon fallback shown if `figure.png` fails to load.
 */
function HeroSculptureFallback() {
  return (
    <div className="hero-sculpture">
      <svg
        className="sculpture-svg"
        viewBox="0 0 620 620"
        role="img"
        aria-label="Abstract glossy orange and white fluid sculpture"
        data-float
      >
        <defs>
          <linearGradient id="orangeRibbon" x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0" stopColor="#FF8A4D" />
            <stop offset="0.42" stopColor="#F1531E" />
            <stop offset="1" stopColor="#B6360F" />
          </linearGradient>
          <linearGradient id="orangeRibbon2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF9A63" />
            <stop offset="0.5" stopColor="#F1531E" />
            <stop offset="1" stopColor="#C53E12" />
          </linearGradient>
          <linearGradient id="whiteRibbon" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.55" stopColor="#F3EFEA" />
            <stop offset="1" stopColor="#D7D1C7" />
          </linearGradient>
          <radialGradient id="hotspot" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow" cx="0.5" cy="0.45" r="0.55">
            <stop offset="0" stopColor="#F1531E" stopOpacity="0.18" />
            <stop offset="1" stopColor="#F1531E" stopOpacity="0" />
          </radialGradient>
          <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="18" />
            <feOffset dy="26" result="off" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.22" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ribbonBlur">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        <circle cx="310" cy="300" r="270" fill="url(#glow)" />
        <ellipse
          cx="316"
          cy="486"
          rx="176"
          ry="34"
          fill="#24282E"
          opacity="0.16"
          filter="url(#ribbonBlur)"
        />

        <g filter="url(#softShadow)">
          <path
            d="M168 392
               C 96 330, 110 214, 206 178
               C 286 148, 352 196, 372 268
               C 388 326, 356 372, 300 380
               C 250 388, 214 360, 224 314
               C 232 278, 268 264, 296 286"
            fill="none"
            stroke="url(#whiteRibbon)"
            strokeWidth="60"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M300 380 C 250 388, 214 360, 224 314"
            fill="none"
            stroke="#24282E"
            strokeWidth="60"
            strokeLinecap="round"
            opacity="0.10"
          />

          <path
            d="M250 300
               C 196 232, 248 138, 340 150
               C 430 162, 470 256, 430 338
               C 396 408, 300 432, 232 396
               C 170 364, 150 286, 196 232"
            fill="none"
            stroke="url(#orangeRibbon)"
            strokeWidth="74"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M214 430
               C 300 470, 412 446, 452 360
               C 484 292, 452 214, 386 196"
            fill="none"
            stroke="url(#orangeRibbon2)"
            strokeWidth="70"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M262 268
               C 224 222, 262 168, 332 176
               C 398 184, 432 244, 410 306"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.55"
            filter="url(#ribbonBlur)"
          />
          <path
            d="M250 430 C 320 458, 404 438, 442 372"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.4"
            filter="url(#ribbonBlur)"
          />

          <ellipse
            cx="332"
            cy="200"
            rx="40"
            ry="22"
            fill="url(#hotspot)"
            transform="rotate(-24 332 200)"
          />
          <ellipse
            cx="404"
            cy="338"
            rx="26"
            ry="15"
            fill="url(#hotspot)"
            transform="rotate(40 404 338)"
          />
          <ellipse
            cx="236"
            cy="338"
            rx="30"
            ry="18"
            fill="url(#hotspot)"
            transform="rotate(-12 236 338)"
            opacity="0.8"
          />
        </g>
      </svg>
    </div>
  );
}
