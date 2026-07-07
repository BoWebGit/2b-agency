import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetailContent } from "@/components/CaseDetailContent";
import { JsonLd } from "@/components/JsonLd";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { buildAlternates, siteUrl } from "@/i18n/metadata";
import { translations } from "@/i18n/translations";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    translations[locale].cases.items.map((item) => ({
      locale,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = translations[locale];
  const item = t.cases.items.find((c) => c.slug === slug);

  if (!item) return {};

  return {
    title: `${item.title} - Boweb`,
    description: item.description,
    alternates: buildAlternates(locale, `/cases/${slug}`),
    openGraph: {
      type: "article",
      title: `${item.title} - Boweb`,
      description: item.description,
      images: [item.img],
      locale: locale === "uk" ? "uk_UA" : "en_US",
    },
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = translations[locale];
  const item = t.cases.items.find((c) => c.slug === slug);

  if (!item) notFound();

  const casesIndexPath = locale === defaultLocale ? "/cases" : "/en/cases";

  return (
    <>
      <JsonLd
        id="case-breadcrumb-jsonld"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: t.casesPage.eyebrow,
              item: `${siteUrl}${casesIndexPath}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: item.title,
              item: `${siteUrl}${casesIndexPath}/${slug}`,
            },
          ],
        }}
      />
      <CaseDetailContent slug={slug} />
    </>
  );
}
