"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";
import { defaultLocale, type Locale, localizedPath } from "./config";
import { type Dict, type Lang, translations } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Locale is now a routing concern, not client state: "uk" is served
 * unprefixed and "en" under "/en" (see middleware.ts + src/app/[locale]).
 * This provider derives `lang` from the locale the current route was
 * rendered with (passed down from the `[locale]` layout) and `setLang`
 * navigates to the equivalent path under the other locale instead of
 * mutating localStorage/context state.
 */
export function LanguageProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback(
    (next: Lang) => {
      if (next === locale) return;
      // Strip the current locale prefix (if any) to get the locale-agnostic path.
      const bare =
        locale === defaultLocale
          ? pathname
          : pathname.replace(/^\/en/, "") || "/";
      router.push(localizedPath(next, bare));
    },
    [locale, pathname, router],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang: locale, t: translations[locale], setLang }),
    [locale, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
