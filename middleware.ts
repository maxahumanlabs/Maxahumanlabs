import { NextRequest, NextResponse } from 'next/server';

/**
 * TEMPORARY STOREFRONT SHUTDOWN — controlled by the STOREFRONT_DISABLED env var.
 *
 * The storefront has moved to Shopify on a different domain, but the QR code
 * printed on existing packaging still points at this one. While the switch is on,
 * every route here returns 404 except the authentication page that QR opens.
 *
 * TO TURN THE SITE BACK ON: set STOREFRONT_DISABLED to `false` in the Vercel
 * project (or delete the variable) and redeploy. No code change needed.
 *
 * The default is OFF, so a missing variable can never take the site down by
 * accident — the shutdown only happens when it is explicitly set to "true".
 */
const STOREFRONT_DISABLED = process.env.STOREFRONT_DISABLED === 'true';

/** Routes that stay reachable while the storefront is disabled. */
const ALWAYS_ON = ['/pages/instant-authentication'];

/** `/ar/...` is a visible prefix handled by rewrite below; match on the bare path. */
function stripLocale(pathname: string) {
  if (pathname === '/ar') return '/';
  return pathname.startsWith('/ar/') ? pathname.slice(3) : pathname;
}

/**
 * Locale routing via rewrite:
 * - `/ar/...` URLs stay visible in the browser bar but are served by the
 *   matching non-prefixed route (`/ar/products` -> renders `/products`).
 * - The active locale is exposed to server components through the `x-locale` header.
 * English keeps bare paths (no prefix).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (STOREFRONT_DISABLED) {
    const bare = stripLocale(pathname).replace(/\/+$/, '') || '/';
    if (!ALWAYS_ON.includes(bare)) {
      const url = request.nextUrl.clone();
      url.pathname = '/_not-found';
      return NextResponse.rewrite(url, { status: 404 });
    }
  }

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
  // Skip Next internals and any file with an extension (favicon.png, the
  // how-to-use video, ...) so the authentication page keeps its assets.
  // API routes ARE matched, so they shut down with the rest of the storefront.
  matcher: ['/((?!_next|.*\\..*).*)'],
};
