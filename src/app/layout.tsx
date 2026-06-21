import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export const metadata: Metadata = {
  title: "2b, innovative digital agency",
  description:
    "2b, innovative digital agency for brands in products. Design, web development, promotion and analysis. We build brands that sell inside products.",
  openGraph: {
    type: "website",
    title: "2b, innovative digital agency",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@500;700&family=Inter:wght@400;500;600&display=swap&subset=cyrillic,latin"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
