import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Inter, Onest } from "next/font/google";
import "@/styles/globals.css";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/i18n/config";

/** GA4 Measurement ID (G-XXXXXXXXXX); analytics is only injected when set. */
const gaId = process.env.NEXT_PUBLIC_GA_ID;

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
  variable: "--font-display-family",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-body-family",
  display: "swap",
});

const defaultTitle = "Boweb — створення сайтів, дизайн та SEO-просування";
const defaultDescription =
  "Digital-агенція повного циклу: створення та розробка сайтів, веб-дизайн, SEO-просування й аналітика. Робимо сайти, що приносять клієнтів. Львів та вся Україна.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  openGraph: {
    type: "website",
    title: defaultTitle,
    description: defaultDescription,
    siteName: "Boweb",
    locale: "uk_UA",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og.png"],
  },
  // Favicon comes from the App Router file convention (src/app/icon.svg) -
  // the brand "b" glyph from the logo on a charcoal tile.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F3EF",
};

/**
 * Only the root layout may render `<html>`/`<body>` in the App Router, but
 * dynamic segment params (e.g. `[locale]`) below it are not visible here -
 * and reading the locale via a request-time API (headers/cookies) would
 * force the entire route tree to render dynamically, defeating the static
 * generation set up for every page (see generateStaticParams across
 * src/app/[locale]/**). To keep full static prerendering while still
 * getting `<html lang>` correct, this renders the default-locale value
 * server-side (matches the majority "uk" case with zero JS cost) and
 * corrects it synchronously, before paint, with a tiny inline script for
 * the "en" case - no FOUC, no client-only flash of the wrong language,
 * and crawlers (which execute JS) still see the correct value.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${onest.variable} ${inter.variable}`}>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, hardcoded inline script with no user input
          dangerouslySetInnerHTML={{
            __html:
              "if(location.pathname==='/en'||location.pathname.indexOf('/en/')===0){document.documentElement.lang='en';}",
          }}
        />
      </head>
      <body>
        <JsonLd
          id="organization-jsonld"
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Boweb",
            url: siteUrl,
            logo: `${siteUrl}/images/logo.svg`,
            telephone: "+380936098169",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lviv",
              addressCountry: "UA",
            },
          }}
        />
        {children}
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
