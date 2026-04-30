'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { woocommerce } from '@/lib/woocommerce';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/store/cartStore';

export default function UpsellProducts() {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    const fetchUpsells = async () => {
      try {
        // Fetch 5 products to ensure we have enough backups
        const upsells = await woocommerce.getProducts({ perPage: 5, category: 'trending' });
        
        // If not enough trending, get backups
        if (upsells.length < 5) {
          const backup = await woocommerce.getProducts({ perPage: 5 });
          const combined = [...upsells, ...backup];
          // Keep unique
          const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
          setFetchedProducts(unique);
        } else {
          setFetchedProducts(upsells);
        }
      } catch (error) {
        console.error('Error fetching upsells:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpsells();
  }, []);

  const displayProducts = fetchedProducts
    .filter(p => !items.some(item => item.id === p.id))
    .slice(0, 2);

  if (loading || displayProducts.length === 0) return null;

  return (
    <div className="mt-6 border-t border-gray-100 pt-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{language === 'ar' ? 'قد يعجبك أيضاً' : 'You might also like'}</h3>
      <div className="space-y-3">
        {displayProducts.map((product) => {
          const productName = language === 'ar' && (product as any).arabic_name 
            ? (product as any).arabic_name 
            : product.name;
          
          return (
            <div key={product.id} className="flex gap-3 p-3 bg-white border border-gray-100 rounded-xl">
              <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={product.imageThumbnails?.[0] || product.images[0] || product.image}
                  alt={productName}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <p className="text-xs font-medium text-gray-900 line-clamp-1">{productName}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm font-semibold text-gray-900">Dhs. {parseFloat(product.price).toFixed(2)}</p>
                  <button
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      image: product.imageThumbnails?.[0] || product.images[0] || product.image,
                      bundleType: 'one-month',
                      bundleLabel: t('bundle.one_month'),
                      arabicName: (product as any).arabic_name || '',
                    })}
                    disabled={product.stockStatus !== 'instock'}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                      product.stockStatus === 'instock' 
                        ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {product.stockStatus === 'instock' ? (language === 'ar' ? 'إضافة' : 'Add') : (language === 'ar' ? 'نفذ' : 'Sold Out')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
