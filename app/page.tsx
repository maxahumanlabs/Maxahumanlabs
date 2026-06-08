import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { SITE_URL, localeFromHeaders, pageMetadata } from '@/lib/seo';
import { organizationSchema, websiteSchema, faqSchema } from '@/lib/schema';
import { woocommerce } from '@/lib/woocommerce';
import JsonLd from '@/components/JsonLd';
import HomeClient from '@/components/home/HomeClient';

const getTrendingProducts = unstable_cache(
  async () => woocommerce.getProducts({ category: 'trending', perPage: 10 }),
  ['home-trending'],
  { revalidate: 300 }
);

export async function generateMetadata(): Promise<Metadata> {
  const locale = localeFromHeaders();
  const meta = pageMetadata('/', locale, {
    en: {
      title: 'Buy Research Peptides UAE | Lab-Verified | Maxa Human',
      description:
        'Shop lab-verified research peptides shipped across UAE, Saudi Arabia & GCC. Independent CoA on every batch. GHK-Cu, BPC-157, Reta & more.',
    },
    ar: {
      title: 'ببتيدات بحثية عالية النقاء | مكسا هيومن — الإمارات والخليج',
      description:
        'تسوّق ببتيدات بحثية عالية النقاء تُشحن عبر الإمارات والسعودية والخليج. شهادة تحليل مستقلة لكل دفعة. GHK-Cu وBPC-157 وريتا والمزيد.',
    },
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Maxa Human' }],
    },
    twitter: {
      ...meta.twitter,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function Page() {
  const locale = localeFromHeaders();
  const trendingProducts = await getTrendingProducts();
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), faqSchema(locale)]} />
      <HomeClient trendingProducts={trendingProducts} />
    </>
  );
}
