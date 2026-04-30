import { MetadataRoute } from 'next';
import { woocommerce } from '@/lib/woocommerce';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://maxahumanlabs.com';

  // Main pages
  const routes = [
    '',
    '/products',
    '/peptides-x-supplements',
    '/calculator',
    '/academy',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Fetch all products for sitemap
    const products = await woocommerce.getProducts({ perPage: 100 });
    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error('Error generating sitemap products:', error);
    return routes;
  }
}
