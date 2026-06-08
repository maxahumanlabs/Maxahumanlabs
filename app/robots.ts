import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/account/', '/checkout/', '/admin/', '/login', '/signup', '/cart', '/search'],
    },
    sitemap: 'https://www.maxahumanlabs.com/sitemap.xml',
    host: 'https://www.maxahumanlabs.com',
  };
}
