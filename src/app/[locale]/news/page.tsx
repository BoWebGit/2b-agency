import type { Metadata } from "next";
import { NewsPageContent } from "@/components/NewsPageContent";
import { defaultLocale, isLocale } from "@/i18n/config";
import { buildAlternates } from "@/i18n/metadata";
import { translations } from "@/i18n/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = translations[locale];

  return {
    title: `${t.newsPage.title} - 2b agency`,
    description: t.newsPage.lead,
    alternates: buildAlternates(locale, "/news"),
    openGraph: {
      type: "website",
      title: `${t.newsPage.title} - 2b agency`,
      description: t.newsPage.lead,
      locale: locale === "uk" ? "uk_UA" : "en_US",
    },
  };
}

export default function NewsPage() {
  return <NewsPageContent />;
}
