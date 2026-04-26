'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import ProductGrid from '@/components/products/ProductGrid';
import { wordpress } from '@/lib/wordpress';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PeptidesExSupplementsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { woocommerce } = await import('@/lib/woocommerce');
        const data = await woocommerce.getProducts({ category: 'peptides-x-supplements', perPage: 24 });
        setProducts(data);
      } catch (error) {
        console.error('Error fetching Peptides Ex-supplements:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <section className="pb-0">
        <div className="relative bg-[#3b2760] text-white overflow-hidden rounded-t-3xl min-h-[300px] md:min-h-[400px] flex items-center">
          {/* Logo Background with low opacity */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Image
              src="/logo.svg"
              alt="Maxa Human Logo Background"
              width={800}
              height={800}
              className="w-[120%] md:w-full object-contain brightness-0 invert"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#3b2760]/20" />
          
          {/* Content */}
          <div className="relative px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-48 pt-32 w-full">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    {t('products.breadcrumb_home')}
                  </Link>
                </li>
                <li className="text-gray-500">/</li>
                <li className="text-white font-medium">{t('peptides_ex_supplements.title')}</li>
              </ol>
            </nav>
            
            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-white">
              {t('peptides_ex_supplements.title')}
            </h1>
            
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-48 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-gray-500 mt-4">{t('peptides_ex_supplements.loading')}</p>
          </div>
        ) : products.length > 0 ? (
          <>
            {/* Products Grid */}
            <ProductGrid products={products} />
            
            {/* Results Count */}
            <div className="mt-12 text-center text-gray-600">
              {t('peptides_ex_supplements.showing')} {products.length} {products.length === 1 ? t('peptides_ex_supplements.product') : t('peptides_ex_supplements.products')}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">{t('peptides_ex_supplements.no_products_title')}</h2>
            <p className="text-gray-500">
              {t('peptides_ex_supplements.no_products_message')}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
