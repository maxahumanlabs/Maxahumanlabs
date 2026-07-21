'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { decodeHtmlEntities } from '@/lib/utils';

export default function BuildYourStack({ categorySlug }: { categorySlug: string }) {
  const { t, language } = useLanguage();
  const [stackProducts, setStackProducts] = useState<Product[]>([]);
  const [stackItems, setStackItems] = useState<Product[]>([]);
  const [stackPage, setStackPage] = useState(1);
  const [hasMoreStack, setHasMoreStack] = useState(true);
  const [isLoadingMoreStack, setIsLoadingMoreStack] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [addedId, setAddedId] = useState<number | null>(null);

  // Load stack from localStorage on mount
  useEffect(() => {
    const savedStack = localStorage.getItem('maxa-stack');
    if (savedStack) {
      try {
        setStackItems(JSON.parse(savedStack));
      } catch (error) {
        console.error('Error loading stack:', error);
      }
    }
  }, []);

  // Fetch initial products
  useEffect(() => {
    async function loadProducts() {
      setIsInitialLoading(true);
      try {
        const { woocommerce } = await import('@/lib/woocommerce');
        const stack = await woocommerce.getProducts({ category: categorySlug, perPage: 6, page: 1 });
        setStackProducts(stack);
        setHasMoreStack(stack.length === 6);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsInitialLoading(false);
      }
    }
    loadProducts();
  }, [categorySlug]);

  const loadMoreStack = async () => {
    if (isLoadingMoreStack || !hasMoreStack) return;
    setIsLoadingMoreStack(true);
    try {
      const { woocommerce } = await import('@/lib/woocommerce');
      const nextPage = stackPage + 1;
      const newProducts = await woocommerce.getProducts({ category: categorySlug, perPage: 6, page: nextPage });
      
      setStackProducts([...stackProducts, ...newProducts]);
      setStackPage(nextPage);
      setHasMoreStack(newProducts.length === 6);
    } catch (error) {
      console.error('Error loading more stack products:', error);
    } finally {
      setIsLoadingMoreStack(false);
    }
  };

  const addToStack = (product: Product) => {
    const updatedStack = [...stackItems, product];
    setStackItems(updatedStack);
    localStorage.setItem('maxa-stack', JSON.stringify(updatedStack));
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((current) => (current === product.id ? null : current));
    }, 1500);
  };

  const removeFromStack = (productId: number) => {
    const updatedStack = stackItems.filter(item => item.id !== productId);
    setStackItems(updatedStack);
    localStorage.setItem('maxa-stack', JSON.stringify(updatedStack));
  };

  const getStackTotal = () => {
    return stackItems.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  const addStackToCart = async () => {
    if (stackItems.length === 0) return;

    try {
      const { useCartStore } = await import('@/store/cartStore');
      const addItem = useCartStore.getState().addItem;

      stackItems.forEach(product => {
        addItem({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
        });
      });

      setStackItems([]);
      localStorage.removeItem('maxa-stack');

      const toggleCart = useCartStore.getState().toggleCart;
      toggleCart();
    } catch (error) {
      console.error('Error adding stack to cart:', error);
    }
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100 mt-12 w-full max-w-[1600px] mx-auto">
      <div className="max-w-[1400px] mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl font-bold text-gray-900 mb-4">
            {t('stack.title')}
          </h2>
          <p className="text-gray-600 text-base lg:text-base xl:text-lg 2xl:text-xl max-w-2xl">
            {t('stack.description')}
          </p>
        </div>

        {/* Stack Builder Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Stack Cards Container */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {isInitialLoading ? (
                // Show placeholder cards while loading
                [1, 2, 3].map((i) => (
                  <div key={i} className="relative bg-white rounded-3xl overflow-hidden shadow-sm">
                    <div className="relative bg-gray-100 aspect-square animate-pulse" />
                    <div className="bg-gray-50 p-5">
                      <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
                      <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
                      <div className="h-12 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))
              ) : stackProducts.length > 0 ? (
                stackProducts.map((product) => (
                  <div key={product.id} className="relative bg-gray-50 rounded-xl overflow-hidden shadow-sm group">
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      {product.onSale && product.regularPrice && product.salePrice && (
                        <span className="bg-red-500 text-white text-xs lg:text-xs xl:text-sm 2xl:text-sm font-bold px-4 py-1.5 rounded-full">
                          Save {Math.round(((parseFloat(product.regularPrice) - parseFloat(product.salePrice)) / parseFloat(product.regularPrice)) * 100)}%
                        </span>
                      )}
                      {product.stockStatus !== 'instock' && (
                        <span className="bg-gray-400 text-white text-xs lg:text-xs xl:text-sm 2xl:text-sm font-bold px-4 py-1.5 rounded-full">
                          Sold Out
                        </span>
                      )}
                    </div>

                    {/* Product Image */}
                    <div className="relative bg-gray-100 aspect-square flex items-center justify-center overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0] || product.imageThumbnails?.[0] || '/placeholder.jpg'}
                          alt={decodeHtmlEntities(product.name)}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                      )}

                      {/* Desktop: Add to Stack pill slides up from the bottom of the image on hover */}
                      <div className="hidden md:block absolute inset-x-0 bottom-0 p-3 z-20 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                        <button
                          onClick={() => addToStack(product)}
                          disabled={product.stockStatus !== 'instock'}
                          className={`w-full py-3 rounded-full font-semibold text-white text-sm lg:text-base transition-colors flex items-center justify-center gap-2 ${
                            product.stockStatus === 'instock' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-600 cursor-not-allowed'
                          }`}
                        >
                          {addedId === product.id ? (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              {t('stack.added_button') || 'Added!'}
                            </>
                          ) : (
                            product.stockStatus === 'instock' ? t('stack.add_button') : t('stack.sold_out')
                          )}
                        </button>
                      </div>

                      {/* Mobile: round add icon, always visible */}
                      <button
                        onClick={() => addToStack(product)}
                        disabled={product.stockStatus !== 'instock'}
                        aria-label={t('stack.add_button')}
                        className={`md:hidden absolute bottom-3 right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-lg z-20 ${
                          product.stockStatus === 'instock' ? 'bg-gray-900 text-white' : 'bg-gray-600 text-white cursor-not-allowed'
                        }`}
                      >
                        {addedId === product.id ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="bg-gray-50 p-5">
                      <p className="text-gray-500 text-xs lg:text-xs xl:text-sm 2xl:text-sm mb-1 uppercase tracking-wide">
                        Maxa Human
                      </p>
                      <h3 className="text-gray-900 text-base lg:text-base xl:text-lg 2xl:text-xl font-medium">{decodeHtmlEntities(language === 'ar' && (product as any).arabic_name ? (product as any).arabic_name : product.name)}</h3>

                      {/* Price below the product name */}
                      <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                        <p className="text-red-500 font-semibold text-base lg:text-base xl:text-lg 2xl:text-xl">
                          Dhs. {parseFloat(product.price).toFixed(2)}
                        </p>
                        {product.onSale && product.regularPrice && parseFloat(product.regularPrice) > parseFloat(product.price) && (
                          <p className="text-gray-400 text-sm lg:text-sm xl:text-base 2xl:text-lg line-through">
                            Dhs. {parseFloat(product.regularPrice).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-gray-500">
                  No products found to build a stack.
                </div>
              )}
            </div>
            
            {/* Load More Button */}
            {hasMoreStack && stackProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button 
                  onClick={loadMoreStack}
                  disabled={isLoadingMoreStack}
                  className="bg-[#0b182b] text-white px-8 py-3 rounded-full font-medium hover:bg-[#1c3a5c] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoadingMoreStack ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                    </>
                  ) : (
                    language === 'ar' ? 'عرض المزيد' : 'Load More'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Your Stack Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-gray-900 rounded-3xl p-8 sticky top-24 min-h-[400px] flex flex-col">
              <h3 className="text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-gray-900 mb-4">{t('stack.your_stack')}</h3>

              {/* Stack Items */}
              <div className="flex-grow overflow-y-auto max-h-[300px] mb-4">
                {stackItems.length > 0 ? (
                  <div className="space-y-3">
                    {stackItems.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                        {/* Product Image */}
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          {item.image || (item.images && item.images.length > 0) ? (
                            <Image
                              src={(item as any).imageThumbnails?.[0] || item.image || item.images[0]}
                              alt={decodeHtmlEntities(item.name)}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{decodeHtmlEntities(language === 'ar' && (item as any).arabic_name ? (item as any).arabic_name : item.name)}</p>
                          <p className="text-xs text-gray-500">Dhs. {parseFloat(item.price).toFixed(2)}</p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromStack(item.id)}
                          className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Remove from stack"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-sm text-center">{t('stack.empty')}</p>
                  </div>
                )}
              </div>

              {/* Total Section */}
              <div className="flex justify-between items-center mb-6 pt-4 border-t-2 border-gray-200">
                <span className="text-gray-900 font-semibold text-lg lg:text-lg xl:text-xl 2xl:text-2xl">{t('stack.total')}</span>
                <span className="text-gray-900 font-bold text-lg lg:text-lg xl:text-xl 2xl:text-2xl">
                  Dhs. {getStackTotal().toFixed(2)}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addStackToCart}
                className={`w-full font-semibold py-4 text-base lg:text-base xl:text-base 2xl:text-lg rounded-full transition-colors ${stackItems.length > 0
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-600 text-white cursor-not-allowed'
                  }`}
                disabled={stackItems.length === 0}
              >
                {t('stack.add_to_cart')} ({stackItems.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
