import { unstable_cache } from 'next/cache';
import { woocommerce } from '@/lib/woocommerce';
import type { Product } from '@/types';

/**
 * Fetch a category's products with caching that NEVER persists an empty/failed
 * result. `woocommerce.getProducts` swallows API errors and returns `[]`; if that
 * `[]` gets cached it poisons the page until the next revalidation (this caused
 * the empty /peptides-x-supplements page). Here, an empty result throws inside the
 * cached function so it is not stored, and we fall back to a direct (uncached)
 * fetch so a transient hiccup never sticks.
 */
export async function getCachedCategoryProducts(
  category: string,
  cacheKey: string,
  perPage = 100
): Promise<Product[]> {
  const fetcher = () => woocommerce.getProducts({ category, perPage });
  try {
    return await unstable_cache(
      async () => {
        const products = await fetcher();
        if (!products.length) {
          // Don't cache an empty/failed result — let it retry next request.
          throw new Error(`empty-result:${cacheKey}`);
        }
        return products;
      },
      [cacheKey],
      { revalidate: 300 }
    )();
  } catch {
    return fetcher();
  }
}
