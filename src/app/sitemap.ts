import type { MetadataRoute } from "next";
import { defaultLocale, locales, localizedPath, siteUrl } from "@/i18n/config";
import { translations } from "@/i18n/translations";

/**
 * Builds one sitemap entry per static path, with `alternates.languages`
 * covering every locale for that same path - generated from the same
 * cases/news slug data used by the pages themselves, never hardcoded.
 */
function entry(path: string): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${siteUrl}${localizedPath(locale, path)}`;
  }

  return {
    url: `${siteUrl}${localizedPath(defaultLocale, path)}`,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/cases", "/news"];

  const caseSlugs = translations[defaultLocale].cases.items.map(
    (item) => item.slug,
  );
  const newsSlugs = translations[defaultLocale].newsPage.items.map(
    (item) => item.slug,
  );

  const casePaths = caseSlugs.map((slug) => `/cases/${slug}`);
  const newsPaths = newsSlugs.map((slug) => `/news/${slug}`);

  return [...staticPaths, ...casePaths, ...newsPaths].map(entry);
}
