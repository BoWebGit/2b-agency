import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale } from "@/i18n/config";

/**
 * Locale routing without a visible "/uk" prefix: every request that isn't
 * already under "/en" (and isn't a Next internal/static asset request) is
 * rewritten to "/uk/..." internally so `src/app/[locale]/...` resolves it,
 * while the browser-visible URL stays unprefixed (e.g. "/", "/cases").
 * "/en/..." requests pass through untouched and resolve to the same
 * `[locale]` segment with locale="en".
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/en" ||
    pathname.startsWith("/en/") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // "/uk" and "/uk/..." are not valid public paths (the default locale is
  // served unprefixed) - redirect to the canonical unprefixed URL instead of
  // letting it fall through to the rewrite below, which would otherwise
  // double-prefix it to "/uk/uk..." and 404.
  if (pathname === "/uk" || pathname.startsWith("/uk/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
