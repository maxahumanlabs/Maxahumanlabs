import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/products/ProductDetailClient';
import { woocommerce } from '@/lib/woocommerce';

import { Metadata, ResolvingMetadata } from 'next';
import { SITE_URL, localeFromHeaders, buildAlternates } from '@/lib/seo';
import { productSchema, breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';

export const revalidate = 300;

async function getCachedProduct(slug: string) {
  return unstable_cache(
    async () => woocommerce.getProductBySlug(slug),
    ['product-by-slug', slug],
    { revalidate: 300 }
  )();
}

async function getCachedReviews(productId: number) {
  return unstable_cache(
    async () => woocommerce.getProductReviews(productId),
    ['product-reviews', productId.toString()],
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

  const locale = localeFromHeaders();
  const alternates = buildAlternates(`/products/${params.slug}`, locale);
  const canonical = (alternates as { canonical: string }).canonical;
  const description =
    product.shortDescription?.replace(/<[^>]+>/g, '') ||
    product.description?.replace(/<[^>]+>/g, '').substring(0, 160);

  return {
    title: product.name,
    description,
    openGraph: {
      title: `${product.name} | Maxa Human`,
      description: product.shortDescription?.replace(/<[^>]+>/g, ''),
      url: canonical,
      type: 'website',
      siteName: 'Maxa Human',
      images: [product.image, ...previousImages],
    },
    keywords: `${product.name}, research peptides, ${product.categories.join(', ')}, Maxa Human`,
    alternates,
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

  // Fetch reviews for this product
  const reviews = await getCachedReviews(product.id);

  const locale = localeFromHeaders();
  const prefix = locale === 'ar' ? '/ar' : '';
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: `${prefix}/` },
    { name: 'All Peptides', path: `${prefix}/products` },
    { name: product.name, path: `${prefix}/products/${product.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[productSchema(product, locale), breadcrumb]} />
      <ProductDetailClient product={product} reviews={reviews} />
    </>
  );
}
