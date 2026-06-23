import type { Metadata } from "next";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
  siteUrl,
} from "./config";

/**
 * Builds the `alternates.canonical` + `alternates.languages` (hreflang)
 * block for a route given its locale-agnostic path (e.g. "/", "/cases",
 * "/cases/vrublivskyi"). Used by every route's `generateMetadata`.
 */
export function buildAlternates(
  locale: Locale,
  path: string,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = localizedPath(l, path);
  }
  // x-default points at the default locale, per standard hreflang practice.
  languages["x-default"] = localizedPath(defaultLocale, path);

  return {
    canonical: localizedPath(locale, path),
    languages,
  };
}

export { siteUrl };
