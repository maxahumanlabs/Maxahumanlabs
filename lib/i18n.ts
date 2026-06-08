export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/**
 * Determine the active locale from the browser-visible pathname.
 * Arabic pages are prefixed with `/ar`; everything else is English.
 */
export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  const p = pathname || '/';
  if (p === '/ar' || p.startsWith('/ar/')) return 'ar';
  return 'en';
}

/**
 * Remove the `/ar` locale prefix, returning the bare path (always starts with `/`).
 * `/ar` -> `/`, `/ar/products` -> `/products`, `/products` -> `/products`.
 */
export function stripLocale(pathname: string | null | undefined): string {
  const p = pathname || '/';
  if (p === '/ar') return '/';
  if (p.startsWith('/ar/')) return p.slice(3);
  return p;
}

/**
 * Add the locale prefix to an internal href.
 * English keeps the bare path; Arabic gets a `/ar` prefix.
 * External links, anchors, mailto/tel and relative paths are returned untouched.
 * Query strings and hashes are preserved since they trail the path string.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (locale !== 'ar') return href;
  // Only internal absolute paths get prefixed. This skips http(s), mailto, tel, #anchor and relative hrefs.
  if (!href.startsWith('/')) return href;
  // Already localized.
  if (href === '/ar' || href.startsWith('/ar/')) return href;
  if (href === '/') return '/ar';
  return `/ar${href}`;
}
