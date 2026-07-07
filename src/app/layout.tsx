import type { Metadata, Viewport } from "next";
import { Inter, Onest } from "next/font/google";
import "@/styles/globals.css";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/i18n/config";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Boweb, innovative digital agency",
  description:
    "Boweb, innovative digital agency for brands in products. Design, web development, promotion and analysis. We build brands that sell inside products.",
  openGraph: {
    type: "website",
    title: "Boweb, innovative digital agency",
    description:
      "We build brands that sell inside products. A full cycle digital agency: design, web development, promotion and analysis.",
    locale: "uk_UA",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23F5F3EF'/%3E%3Ctext x='9' y='45' font-family='Arial,sans-serif' font-size='34' font-weight='700' fill='%2324282E'%3E2%3C/text%3E%3Ctext x='30' y='45' font-family='Arial,sans-serif' font-size='34' font-weight='700' fill='%23F1531E'%3Eb%3C/text%3E%3C/svg%3E",
  },
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
    </html>
  );
}
