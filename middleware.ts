import { NextRequest, NextResponse } from 'next/server';

/**
 * Locale routing via rewrite:
 * - `/ar/...` URLs stay visible in the browser bar but are served by the
 *   matching non-prefixed route (`/ar/products` -> renders `/products`).
 * - The active locale is exposed to server components through the `x-locale` header.
 * English keeps bare paths (no prefix).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/ar' ? '/' : pathname.slice(3);
    const res = NextResponse.rewrite(url);
    res.headers.set('x-locale', 'ar');
    return res;
  }

  const res = NextResponse.next();
  res.headers.set('x-locale', 'en');
  return res;
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (favicon.png, og-image.png, ...).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
