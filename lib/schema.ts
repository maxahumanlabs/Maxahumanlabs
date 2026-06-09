import { SITE_URL } from '@/lib/seo';
import { translations } from '@/lib/translations';
import type { Locale } from '@/lib/i18n';
import type { Product } from '@/types';

const ORG_NAME = 'Maxa Human';

/** Organization schema for the homepage (MXA-010). */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    alternateName: 'Maxa Human Labs',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`,
      width: 200,
      height: 60,
    },
    description:
      'High-purity research peptides with independent lab verification. UAE, Saudi Arabia & GCC.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971-52-810-7166',
      contactType: 'Customer Service',
      areaServed: ['AE', 'SA', 'KW', 'BH', 'QA', 'OM', 'US'],
      availableLanguage: ['English', 'Arabic'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressRegion: 'Dubai',
    },
  };
}

/** WebSite schema for the homepage (MXA-010). */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG_NAME,
    url: SITE_URL,
    inLanguage: ['en', 'ar'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** FAQPage schema built from the localized FAQ content (MXA-016). */
export function faqSchema(locale: Locale) {
  const faqs = translations[locale]?.faqs?.questions ?? translations.en.faqs.questions;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((q: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

/**
 * Product schema (MXA-009). Currency AED. Uses REAL review data only — when a
 * product has zero reviews the aggregateRating is omitted (never fabricated).
 */
export function productSchema(product: Product, locale: Locale) {
  const path = locale === 'ar' ? `/ar/products/${product.slug}` : `/products/${product.slug}`;
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.length ? product.images : [product.image],
    description: product.shortDescription?.replace(/<[^>]+>/g, '') || product.name,
    sku: product.id.toString(),
    brand: { '@type': 'Brand', name: ORG_NAME },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}${path}`,
      priceCurrency: 'AED',
      price: product.price,
      availability:
        product.stockStatus === 'outofstock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: ORG_NAME },
    },
  };

  // Only include ratings backed by real reviews (Google penalizes fabricated ratings).
  if (product.ratingCount > 0 && product.rating > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.ratingCount.toString(),
      bestRating: '5',
      worstRating: '1',
    };
  }

  return schema;
}

/** CollectionPage schema for category/listing pages (MXA — page recs). */
export function collectionPageSchema(name: string, description: string, urlPath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE_URL}${urlPath}`,
    isPartOf: { '@type': 'WebSite', name: ORG_NAME, url: SITE_URL },
  };
}

/** WebApplication schema for the dosage calculator tool (page recs). */
export function webApplicationSchema(name: string, description: string, urlPath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE_URL}${urlPath}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'AED' },
    provider: { '@type': 'Organization', name: ORG_NAME, url: SITE_URL },
  };
}

type Crumb = { name: string; path: string };

/** BreadcrumbList schema (MXA-017). `path` is locale-prefixed already. */
export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
