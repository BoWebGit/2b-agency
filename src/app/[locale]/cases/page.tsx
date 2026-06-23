import type { Metadata } from "next";
import { CasesPageContent } from "@/components/CasesPageContent";
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
    title: `${t.casesPage.title} - 2b agency`,
    description: t.casesPage.lead,
    alternates: buildAlternates(locale, "/cases"),
    openGraph: {
      type: "website",
      title: `${t.casesPage.title} - 2b agency`,
      description: t.casesPage.lead,
      locale: locale === "uk" ? "uk_UA" : "en_US",
    },
  };
}

export default function CasesPage() {
  return <CasesPageContent />;
}
