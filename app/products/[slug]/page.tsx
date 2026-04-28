import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/products/ProductDetailClient';
import { woocommerce } from '@/lib/woocommerce';

export const revalidate = 300;

async function getCachedProduct(slug: string) {
  return unstable_cache(
    async () => woocommerce.getProductBySlug(slug),
    ['product-by-slug', slug],
    { revalidate: 300 }
  )();
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getCachedProduct(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
