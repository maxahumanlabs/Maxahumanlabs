import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/products/ProductDetailClient';
import { woocommerce } from '@/lib/woocommerce';

import { Metadata, ResolvingMetadata } from 'next';

export const revalidate = 300;

async function getCachedProduct(slug: string) {
  return unstable_cache(
    async () => woocommerce.getProductBySlug(slug),
    ['product-by-slug', slug],
    { revalidate: 300 }
  )();
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getCachedProduct(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.name,
    description: product.shortDescription?.replace(/<[^>]+>/g, '') || product.description?.replace(/<[^>]+>/g, '').substring(0, 160),
    openGraph: {
      title: `${product.name} | Maxa Human`,
      description: product.shortDescription?.replace(/<[^>]+>/g, ''),
      images: [product.image, ...previousImages],
    },
    keywords: `${product.name}, research peptides, ${product.categories.join(', ')}, Maxa Human`,
  };
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
