import { unstable_cache } from 'next/cache';
import { woocommerce } from '@/lib/woocommerce';
import CategoryClient from '@/components/products/CategoryClient';

export const revalidate = 300;

async function getCachedProducts() {
  return unstable_cache(
    async () => woocommerce.getProducts({ category: 'peptides-x-supplements', perPage: 24 }),
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
