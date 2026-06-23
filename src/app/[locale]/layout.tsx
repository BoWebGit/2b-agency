import { notFound } from "next/navigation";
import { CalculatorProvider } from "@/components/CalculatorProvider";
import { isLocale, locales } from "@/i18n/config";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <LanguageProvider locale={locale}>
      <CalculatorProvider>{children}</CalculatorProvider>
    </LanguageProvider>
  );
}
