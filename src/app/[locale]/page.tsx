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
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: buildAlternates(locale, "/"),
    openGraph: {
      type: "website",
      title: t.metaTitle,
      description: t.metaDescription,
      siteName: "Boweb",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: ["/og.png"],
    },
  };
}

export default function Home() {
  return <PageShell />;
}
