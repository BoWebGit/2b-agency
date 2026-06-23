import type { Lang } from "./translations";

/** Supported locales. "uk" is the default and is served unprefixed (e.g. "/", "/cases"); "en" is served under "/en". */
export const locales = ["uk", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uk";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** `Locale` and `Lang` are the same set of values - kept as distinct names because Locale is a URL/routing concept and Lang is a translations-dictionary concept. */
export function localeToLang(locale: Locale): Lang {
  return locale;
}

export const siteUrl = "https://2b.agency";

/**
 * Builds an absolute pathname for `path` (e.g. "/cases/foo") in the given
 * locale. "uk" is unprefixed, "en" is prefixed with "/en".
 */
export function localizedPath(locale: Locale, path: string): string {
  const normalized = path === "/" ? "" : path;
  if (locale === defaultLocale) return normalized || "/";
  return `/en${normalized}`;
}
