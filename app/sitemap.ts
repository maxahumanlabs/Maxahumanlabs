import { MetadataRoute } from 'next';
import { woocommerce } from '@/lib/woocommerce';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.maxahumanlabs.com';

  // Build an English + Arabic entry pair for a given path, wiring hreflang alternates.
  const entry = (
    route: string,
    changeFrequency: 'daily' | 'weekly',
    priority: number
  ): MetadataRoute.Sitemap => {
    const en = `${baseUrl}${route}`;
    const ar = `${baseUrl}/ar${route}`;
    const languages = { en, ar, 'x-default': en };
    return [
      {
        url: en,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: { languages },
      },
      {
        url: ar,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: { languages },
      },
    ];
  };

  // Main pages
  const mainPaths = [
    '',
    '/products',
    '/peptides-x-supplements',
    '/calculator',
    '/academy',
    '/privacy-policy',
    '/terms-of-service',
  ];
  const routes = mainPaths.flatMap((route) =>
    entry(route, 'daily', route === '' ? 1 : 0.8)
  );

  try {
    // Fetch all products for sitemap
    const products = await woocommerce.getProducts({ perPage: 100 });
    const productRoutes = products.flatMap((product) =>
      entry(`/products/${product.slug}`, 'weekly', 0.7)
    );

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error('Error generating sitemap products:', error);
    return routes;
  }
}
