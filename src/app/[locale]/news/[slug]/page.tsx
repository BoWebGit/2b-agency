import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { NewsArticleContent } from "@/components/NewsArticleContent";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { buildAlternates, siteUrl } from "@/i18n/metadata";
import { translations } from "@/i18n/translations";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    translations[locale].newsPage.items.map((item) => ({
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
  const article = t.newsPage.items.find((a) => a.slug === slug);

  if (!article) return {};

  return {
    title: `${article.title} - 2b agency`,
    description: article.excerpt,
    alternates: buildAlternates(locale, `/news/${slug}`),
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [article.img],
      locale: locale === "uk" ? "uk_UA" : "en_US",
    },
  };
}

/** Article `date` is stored as "DD.MM.YYYY" for display; JSON-LD needs ISO 8601. */
function toIsoDate(ddmmyyyy: string): string | undefined {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(ddmmyyyy);
  if (!match) return undefined;
  const [, dd, mm, yyyy] = match;
  return `${yyyy}-${mm}-${dd}`;
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = translations[locale];
  const article = t.newsPage.items.find((a) => a.slug === slug);

  if (!article) notFound();

  const newsIndexPath = locale === defaultLocale ? "/news" : "/en/news";
  const isoDate = toIsoDate(article.date);

  return (
    <>
      <JsonLd
        id="article-jsonld"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          image: [`${siteUrl}${article.img}`],
          ...(isoDate ? { datePublished: isoDate } : {}),
          author: {
            "@type": "Organization",
            name: "2b agency",
          },
          publisher: {
            "@type": "Organization",
            name: "2b agency",
          },
        }}
      />
      <JsonLd
        id="article-breadcrumb-jsonld"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: t.newsPage.eyebrow,
              item: `${siteUrl}${newsIndexPath}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: article.title,
              item: `${siteUrl}${newsIndexPath}/${slug}`,
            },
          ],
        }}
      />
      <NewsArticleContent slug={slug} />
    </>
  );
}
