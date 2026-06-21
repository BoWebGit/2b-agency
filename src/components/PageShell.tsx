"use client";

import { useCallback, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { About } from "./About";
import { Blog } from "./Blog";
import { Cases } from "./Cases";
import { Contacts } from "./Contacts";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { Preloader } from "./Preloader";
import { Price } from "./Price";
import { Services } from "./Services";
import { Stats } from "./Stats";

/**
 * Top-level client shell: preloader, custom cursor, decorative fixed
 * layers (grain/ambient), skip link, header, all sections and footer -
 * ports the full body of index.html. `heroRevealed` is flipped by the
 * preloader's `onDone`, exactly like the original's `finishPreloader()`
 * calling `revealHero()`.
 */
export function PageShell() {
  const { t } = useLanguage();
  const [heroRevealed, setHeroRevealed] = useState(false);
  const handlePreloaderDone = useCallback(() => setHeroRevealed(true), []);

  return (
    <>
      <Preloader onDone={handlePreloaderDone} />
      <CustomCursor />

      <div className="grain" aria-hidden="true" />
      <div className="ambient" aria-hidden="true" />

      <a className="skip-link" href="#main">
        {t.skipLink}
      </a>

      <Header />

      <main id="main">
        <Hero heroRevealed={heroRevealed} />
        <Marquee />
        <About />
        <Stats />
        <Services />
        <Cases />
        <Price />
        <Blog />
        <Contacts />
      </main>

      <Footer />
    </>
  );
}
