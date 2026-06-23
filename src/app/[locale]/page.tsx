import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
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
    title: "2b, innovative digital agency",
    description: t.metaDescription,
    alternates: buildAlternates(locale, "/"),
    openGraph: {
      type: "website",
      title: "2b, innovative digital agency",
      description: t.metaDescription,
      locale: locale === "uk" ? "uk_UA" : "en_US",
    },
  };
}

export default function Home() {
  return <PageShell />;
}
