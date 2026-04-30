import { unstable_cache } from 'next/cache';
import { woocommerce } from '@/lib/woocommerce';
import CategoryClient from '@/components/products/CategoryClient';

export const revalidate = 300;

async function getCachedProducts() {
  return unstable_cache(
    async () => woocommerce.getProducts({ category: 'all', perPage: 24 }),
    ['products-all'],
    { revalidate: 300 }
  )();
}

export default async function ProductsPage() {
  const products = await getCachedProducts();

  return (
    <CategoryClient 
      products={products} 
      categorySlug="all" 
      translationKeyPrefix="products" 
    />
  );
}
