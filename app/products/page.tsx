import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { woocommerce } from '@/lib/woocommerce';
import CategoryClient from '@/components/products/CategoryClient';
import { localeFromHeaders, pageMetadata } from '@/lib/seo';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const locale = localeFromHeaders();
  return pageMetadata('/products', locale, {
    en: {
      title: 'Buy Research Peptides Online UAE | GHK-Cu, BPC-157, Reta | Maxa Human',
      description:
        'Shop 20+ lab-verified research peptides shipped across UAE & GCC. GHK-Cu, BPC-157, MOTS-c, Reta, Epithalon & more. Batch CoA included.',
    },
    ar: {
      title: 'اشترِ ببتيدات بحثية أونلاين | GHK-Cu وBPC-157 وريتا | مكسا هيومن',
      description:
        'تسوّق من 20+ ببتيد بحثي معتمد مختبريًا، شحن في الإمارات والخليج. GHK-Cu وBPC-157 وMOTS-c وريتا. شهادة دفعة مرفقة.',
    },
  });
}

async function getCachedProducts() {
  return unstable_cache(
    async () => woocommerce.getProducts({ category: 'all', perPage: 100 }),
    ['products-all'],
    { revalidate: 300 }
  )();
}

export default async function ProductsPage() {
  const products = await getCachedProducts();
  const locale = localeFromHeaders();
  const prefix = locale === 'ar' ? '/ar' : '';

  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema(
            'Research Peptides',
            'Lab-verified research peptides shipped across the UAE & GCC.',
            `${prefix}/products`
          ),
          breadcrumbSchema([
            { name: 'Home', path: `${prefix}/` },
            { name: 'All Peptides', path: `${prefix}/products` },
          ]),
        ]}
      />
      <CategoryClient
        products={products}
        categorySlug="all"
        translationKeyPrefix="products"
      />
    </>
  );
}
