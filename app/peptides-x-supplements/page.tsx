import type { Metadata } from 'next';
import CategoryClient from '@/components/products/CategoryClient';
import { localeFromHeaders, pageMetadata } from '@/lib/seo';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/schema';
import { getCachedCategoryProducts } from '@/lib/products';
import JsonLd from '@/components/JsonLd';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const locale = localeFromHeaders();
  return pageMetadata('/peptides-x-supplements', locale, {
    en: {
      title: 'Research Peptide Capsules & Supplements UAE | Oral Peptide Range | Maxa Human',
      description:
        'Oral research peptide capsules — BPC-157, Wolverine Oral, GLP-1, NAD+, SLU-PP-332 & more. Lab-verified. Shipped across UAE & GCC.',
    },
    ar: {
      title: 'كبسولات ببتيدات بحثية ومكملات | مكسا هيومن الإمارات',
      description:
        'كبسولات ببتيدات بحثية فموية — BPC-157 وولفرين أورال وGLP-1 وNAD+ والمزيد. معتمدة مختبريًا. شحن في الإمارات والخليج.',
    },
  });
}

export default async function PeptidesExSupplementsPage() {
  const products = await getCachedCategoryProducts(
    'peptides-x-supplements',
    'products-peptides-x-supplements'
  );
  const locale = localeFromHeaders();
  const prefix = locale === 'ar' ? '/ar' : '';

  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema(
            'Research Peptide Capsules & Supplements',
            'Oral research peptide capsules and supplements, lab-verified, shipped across the UAE & GCC.',
            `${prefix}/peptides-x-supplements`
          ),
          breadcrumbSchema([
            { name: 'Home', path: `${prefix}/` },
            { name: 'Supplements', path: `${prefix}/peptides-x-supplements` },
          ]),
        ]}
      />
      <CategoryClient
        products={products}
        categorySlug="peptides-x-supplements"
        translationKeyPrefix="peptides_ex_supplements"
      />
    </>
  );
}
