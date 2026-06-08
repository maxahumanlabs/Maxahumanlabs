import { headers } from 'next/headers';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';

/** Canonical production origin — www, https (per SEO spec MXA-001/006). */
export const SITE_URL = 'https://www.maxahumanlabs.com';

/** Read the active locale set by middleware (x-locale header). Forces dynamic rendering. */
export function localeFromHeaders(): Locale {
  return headers().get('x-locale') === 'ar' ? 'ar' : 'en';
}

/**
 * Build self-referencing canonical + hreflang alternates for a page.
 * `path` is the English path WITHOUT locale prefix (e.g. '/products', '/' for home).
 * canonical points to the active locale's own URL; languages always lists both + x-default(en).
 */
export function buildAlternates(path: string, locale: Locale): Metadata['alternates'] {
  const enUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const arUrl = path === '/' ? `${SITE_URL}/ar` : `${SITE_URL}/ar${path}`;
  return {
    canonical: locale === 'ar' ? arUrl : enUrl,
    languages: {
      en: enUrl,
      ar: arUrl,
      'x-default': enUrl,
    },
  };
}

type Localized = { title: string; description: string };

/**
 * Assemble a page's Metadata from per-locale title/description + path.
 * Uses `title.absolute` so the page title is exact (the spec titles already include "| Maxa Human").
 */
export function pageMetadata(
  path: string,
  locale: Locale,
  content: Record<Locale, Localized>,
  ogType: 'website' | 'article' = 'website'
): Metadata {
  const { title, description } = content[locale];
  const alternates = buildAlternates(path, locale);
  const url = (alternates as { canonical: string }).canonical;
  return {
    title: { absolute: title },
    description,
    alternates,
    openGraph: {
      title,
      description,
      url,
      type: ogType,
      siteName: 'Maxa Human',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
