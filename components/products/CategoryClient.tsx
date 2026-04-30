'use client';

import Link from 'next/link';
import { Product } from '@/types';
import ProductGrid from '@/components/products/ProductGrid';
import { useLanguage } from '@/contexts/LanguageContext';
import BuildYourStack from '@/components/products/BuildYourStack';

interface CategoryClientProps {
  products: Product[];
  categorySlug: string;
  translationKeyPrefix: string;
}

export default function CategoryClient({ products, categorySlug, translationKeyPrefix }: CategoryClientProps) {
  const { t } = useLanguage();

  return (
    <div>
      {/* Banner Section */}
      <section className="pb-0">
        <div className="relative bg-white text-gray-900 overflow-hidden rounded-t-3xl">
          {/* Content */}
          <div className="relative px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-48 pt-12 md:pt-16 pb-8 md:pb-10 w-full">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                    {t('products.breadcrumb_home')}
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium">{t(`${translationKeyPrefix}.title`)}</li>
              </ol>
            </nav>
            
            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-gray-900">
              {t(`${translationKeyPrefix}.title`)}
            </h1>
            
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-48 py-12">
        {products.length > 0 ? (
          <>
            {/* Products Grid */}
            <ProductGrid products={products} />
            
            {/* Results Count */}
            <div className="mt-12 text-center text-gray-600">
              {t(`${translationKeyPrefix}.showing`)} {products.length} {products.length === 1 ? t(`${translationKeyPrefix}.product`) : t(`${translationKeyPrefix}.products`)}
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
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">{t(`${translationKeyPrefix}.no_products_title`)}</h2>
            <p className="text-gray-500">
              {t(`${translationKeyPrefix}.no_products_message`)}
            </p>
          </div>
        )}
      </section>

      {/* Build Your Stack Section */}
      <BuildYourStack categorySlug={categorySlug} />
    </div>
  );
}
