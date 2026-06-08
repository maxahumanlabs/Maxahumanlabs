import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { woocommerce } from '@/lib/woocommerce';
import CategoryClient from '@/components/products/CategoryClient';
import { localeFromHeaders, pageMetadata } from '@/lib/seo';

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

async function getCachedProducts() {
  return unstable_cache(
    async () => woocommerce.getProducts({ category: 'peptides-x-supplements', perPage: 100 }),
    ['products-peptides-x-supplements'],
    { revalidate: 300 }
  )();
}

export default async function PeptidesExSupplementsPage() {
  const products = await getCachedProducts();

  return (
    <CategoryClient 
      products={products} 
      categorySlug="peptides-x-supplements" 
      translationKeyPrefix="peptides_ex_supplements" 
    />
  );
}
