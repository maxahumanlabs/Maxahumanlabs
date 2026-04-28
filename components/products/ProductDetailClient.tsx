'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

type BundleOption = {
  id: string;
  months: number;
  label: string;
  price: number;
  savings?: number;
  savingsPercent?: number;
  isPopular?: boolean;
};

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState('six-months');
  const [email, setEmail] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  const currentPrice = parseFloat(product.salePrice || product.price);
  const originalPrice = parseFloat(product.regularPrice || product.price);
  const savingsPerItem = originalPrice - currentPrice;
  const savingsPercentPerItem = originalPrice > 0 ? ((savingsPerItem / originalPrice) * 100) : 0;
  const bundlePricing = (product as any).bundle_pricing || {};
  const hasValue = (val: any) => val !== null && val !== undefined && val !== '' && parseFloat(val) > 0;

  const threeMonthRegular = hasValue(bundlePricing.three_month?.regular_price)
    ? parseFloat(bundlePricing.three_month.regular_price)
    : originalPrice * 2;
  const threeMonthSale = hasValue(bundlePricing.three_month?.sale_price)
    ? parseFloat(bundlePricing.three_month.sale_price)
    : (hasValue(bundlePricing.three_month?.regular_price) ? threeMonthRegular : (currentPrice * 2 * 0.90));
  const threeMonthSavings = threeMonthRegular - threeMonthSale;
  const threeMonthSavingsPercent = threeMonthRegular > 0 ? ((threeMonthSavings / threeMonthRegular) * 100) : 0;

  const sixMonthRegular = hasValue(bundlePricing.six_month?.regular_price)
    ? parseFloat(bundlePricing.six_month.regular_price)
    : originalPrice * 3;
  const sixMonthSale = hasValue(bundlePricing.six_month?.sale_price)
    ? parseFloat(bundlePricing.six_month.sale_price)
    : (hasValue(bundlePricing.six_month?.regular_price) ? sixMonthRegular : (currentPrice * 3 * 0.85));
  const sixMonthSavings = sixMonthRegular - sixMonthSale;
  const sixMonthSavingsPercent = sixMonthRegular > 0 ? ((sixMonthSavings / sixMonthRegular) * 100) : 0;

  const bundleOptions: BundleOption[] = [
    {
      id: 'six-months',
      months: 6,
      label: t('bundle.six_months'),
      price: sixMonthSale,
      savings: sixMonthSavings,
      savingsPercent: Math.round(sixMonthSavingsPercent),
    },
    {
      id: 'three-months',
      months: 3,
      label: t('bundle.three_months'),
      price: threeMonthSale,
      savings: threeMonthSavings,
      savingsPercent: Math.round(threeMonthSavingsPercent),
      isPopular: true,
    },
    {
      id: 'one-month',
      months: 1,
      label: t('bundle.one_month'),
      price: currentPrice,
      savings: savingsPerItem,
      savingsPercent: Math.round(savingsPercentPerItem),
    },
  ];

  const handleAddToCart = () => {
    const bundle = bundleOptions.find((item) => item.id === selectedBundle);
    if (!bundle) return;

    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: bundle.price.toString(),
      image: product.image,
      bundleType: selectedBundle as 'one-month' | 'three-months' | 'six-months',
      bundleLabel: bundle.label,
      arabicName: (product as any).arabic_name || '',
    });
  };

  const handleNotifyMe = () => {
    if (!email) return;
    alert(`We'll notify you at ${email} when ${product.name} is back in stock!`);
    setEmail('');
  };

  const productName = language === 'ar' && (product as any).arabic_name
    ? (product as any).arabic_name
    : product.name;
  const productDescription = language === 'ar' && (product as any).arabic_description
    ? (product as any).arabic_description
    : product.description;
  const productShortDescription = language === 'ar' && (product as any).arabic_short_description
    ? (product as any).arabic_short_description
    : product.shortDescription;
  const isOutOfStock = product.stockStatus === 'outofstock';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 md:px-12 lg:px-12 xl:px-12 2xl:px-48 py-16 md:py-20 lg:py-20 xl:py-20 2xl:py-24">
      <div className="grid lg:grid-cols-[1.08fr_0.92fr] xl:grid-cols-[1.12fr_0.88fr] gap-12 lg:gap-10 xl:gap-12 2xl:gap-16">
        <div className="space-y-4 lg:space-y-4 xl:space-y-4 2xl:space-y-6">
          <div className="relative aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-[#f3f3f3] border border-gray-200 shadow-sm">
            <Image
              src={product.images[selectedImage] || product.image}
              alt={productName}
              fill
              className="object-contain p-0 md:p-1 scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 lg:gap-3 xl:gap-3 2xl:gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-white rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-gray-900 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={product.imageThumbnails?.[index] || image}
                    alt={`${productName} - ${index + 1}`}
                    fill
                    className="object-contain p-1"
                    sizes="150px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 lg:gap-5 xl:gap-5 2xl:gap-6">
          <div className="order-1 flex items-start justify-between gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl text-gray-900">
              {productName}
            </h1>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl text-pink-600">
                {formatPrice(product.price)}
              </div>
              {product.onSale && (
                <div className="text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-xl text-gray-500 line-through">
                  {formatPrice(product.regularPrice)}
                </div>
              )}
            </div>
          </div>

          <div className="order-2 flex items-center gap-2">
            <span className="text-yellow-400 text-lg">⭐</span>
            <span className="text-sm md:text-base lg:text-base xl:text-base font-semibold text-gray-900">
              4.9/5 (2869 {t('product_detail.reviews')})
            </span>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="order-3 flex flex-wrap gap-3">
              {((language === 'ar' && (product as any).arabic_tags) ? (product as any).arabic_tags.split(',').map((tag: string) => tag.trim()) : product.tags).map((tag: string, index: number) => (
                <div
                  key={index}
                  className="inline-flex items-center justify-center rounded-[25px] px-6 py-3 border border-[rgba(120,90,20,0.4)] shadow-[inset_0_0_6px_rgba(255,255,255,0.3),0_3px_10px_rgba(0,0,0,0.25)] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[inset_0_0_8px_rgba(255,255,255,0.4),0_6px_14px_rgba(0,0,0,0.3)] max-sm:rounded-[18px] max-sm:px-[14px] max-sm:py-2 max-md:rounded-[20px] max-md:px-4 max-md:py-[10px]"
                  style={{
                    background: 'linear-gradient(135deg, #b88900 0%, #f0c76e 20%, #fff3b0 40%, #d1a140 55%, #8c6c1a 70%, #f9d976 85%, #b88900 100%)',
                    backgroundSize: '200% 200%'
                  }}
                >
                  <span className="text-[15px] font-semibold text-black leading-[1.4] max-sm:text-[13px] max-sm:font-medium max-md:text-[14px]">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}

          {isOutOfStock ? (
            <div className="order-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-xs md:text-sm lg:text-sm xl:text-sm font-semibold text-red-600">
                {t('product_detail.out_of_stock')}
              </span>
            </div>
          ) : (
            <div className="order-4 inline-flex items-center px-4 py-2 rounded-full bg-[#f7fee7]">
              <span className="w-3 h-3 mr-2 rounded-full bg-[#4d7c0f] border-2 border-[#487012] shadow-inner"></span>
              <span className="text-[#4d7c0f] font-medium text-sm md:text-base">{t('product_detail.in_stock')}</span>
            </div>
          )}

          <div className="order-5 pt-4">
            <div className="relative text-center mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative inline-block bg-gray-50 px-4">
                <h3 className="text-sm md:text-base lg:text-base xl:text-base font-bold text-gray-900 tracking-wider">
                  {t('product_detail.bundle_save')}
                </h3>
              </div>
            </div>

            <div className="space-y-2 lg:space-y-2 xl:space-y-2 2xl:space-y-3">
              {bundleOptions.map((bundle) => (
                <label
                  key={bundle.id}
                  className={`relative flex items-center p-3 lg:p-3 xl:p-3 2xl:p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedBundle === bundle.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="bundle"
                    value={bundle.id}
                    checked={selectedBundle === bundle.id}
                    onChange={(e) => setSelectedBundle(e.target.value)}
                    className="w-4 h-4 text-gray-900 focus:ring-gray-900 flex-shrink-0"
                  />
                  <div className="flex-1 ml-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-sm md:text-base lg:text-base xl:text-base font-bold text-gray-900">
                          {bundle.label}
                        </div>
                        {bundle.savings && bundle.savings > 0 ? (
                          <div className="text-xs md:text-xs lg:text-xs xl:text-xs text-[#4d7c0f] font-medium">
                            {t('product_detail.you_save')} {formatPrice(bundle.savings)} ({bundle.savingsPercent}%)
                          </div>
                        ) : (
                          <div className="text-xs md:text-xs lg:text-xs xl:text-xs text-gray-500">
                            {t('product_detail.standard_price')}
                          </div>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-base md:text-lg lg:text-lg xl:text-lg font-bold text-gray-900">
                          {formatPrice(bundle.price)}
                        </div>
                        {bundle.savings && bundle.savings > 0 && (
                          <div className="text-xs md:text-xs lg:text-xs xl:text-xs text-gray-500 line-through">
                            {formatPrice(originalPrice * bundle.months)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {bundle.isPopular && (
                    <div className="absolute -top-2 -right-2 bg-black text-white px-2 py-1 rounded-full text-[10px] md:text-xs font-bold">
                      {t('product_detail.most_popular')}
                    </div>
                  )}
                </label>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
                <span className="text-2xl">🎁</span> {t('bundle.unlock_gifts')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-gray-900 rounded-xl p-4 text-center relative flex flex-col items-center justify-center bg-white h-32 shadow-sm">
                  <div className="absolute -top-3 bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1 rounded-md">
                    {t('bundle.free')}
                  </div>
                  <div className="mb-2">
                    <svg className="w-12 h-12 text-[#9333ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11M14 9h4l4 4v5c0 .6-.4 1-1 1h-2" />
                      <circle cx="7" cy="18" r="2" strokeWidth={1.5} />
                      <circle cx="17" cy="18" r="2" strokeWidth={1.5} />
                    </svg>
                  </div>
                  <p className="font-semibold text-sm text-gray-900">{t('bundle.free_shipping')}</p>
                </div>

                <div className="border-2 border-gray-900 rounded-xl p-4 text-center relative flex flex-col items-center justify-center bg-white h-32 shadow-sm">
                  <div className="absolute -top-3 bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1 rounded-md">
                    {t('bundle.free')}
                  </div>
                  <div className="mb-2">
                    <svg className="w-12 h-12 text-[#9333ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="font-semibold text-sm text-gray-900">{t('bundle.free_ebook')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-6 space-y-2 lg:space-y-2 xl:space-y-2 2xl:space-y-3">
            {isOutOfStock ? (
              <button
                onClick={handleNotifyMe}
                className="w-full bg-black text-white text-sm md:text-base lg:text-base xl:text-base py-4 lg:py-4 xl:py-4 2xl:py-5 px-6 rounded-full hover:bg-gray-800 transition-all duration-200"
              >
                {t('product_detail.sold_out_notify')}
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full relative overflow-hidden bg-black text-white text-sm md:text-base lg:text-base xl:text-base py-4 lg:py-4 xl:py-4 2xl:py-5 px-6 rounded-full group border-2 border-black"
              >
                <span className="absolute inset-0 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-full z-0"></span>
                <span className="relative z-10 group-hover:text-black transition-colors duration-400">{t('product_detail.add_to_cart')}</span>
              </button>
            )}

            <button
              onClick={() => {
                const gpayUrl = 'https://pay.google.com/gp/p/ui/pay';
                if (window.innerWidth >= 1024) {
                  window.open(gpayUrl, 'gpay', 'width=500,height=700,menubar=no,toolbar=no,location=no,status=no');
                } else {
                  window.open(gpayUrl, '_blank');
                }
              }}
              disabled={isOutOfStock}
              className="w-full flex items-center justify-center bg-black text-white text-sm md:text-base py-4 lg:py-4 xl:py-4 2xl:py-5 px-6 rounded-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center">
                <span>{t('bundle.buy_with_google_pay')}</span>
              </span>
            </button>
          </div>

          <div className="order-7 lg:order-none">
            {productShortDescription && (
              <div
                className="text-sm md:text-sm text-gray-900 mb-2"
                dangerouslySetInnerHTML={{ __html: productShortDescription }}
              />
            )}

            {productDescription && (
              (() => {
                const hasStructuredContent = productDescription.includes('Contains:') || productDescription.includes('Instructions:');

                if (hasStructuredContent) {
                  const containsMatch = productDescription.match(/Contains:([\s\S]*?)(Instructions:|$)/i);
                  const instructionsMatch = productDescription.match(/Instructions:([\s\S]*?)(<\/p>|$)/i);
                  const contains = containsMatch ? containsMatch[1].replace(/<[^>]+>/g, '').trim() : '';
                  const instructions = instructionsMatch ? instructionsMatch[1].replace(/<[^>]+>/g, '').trim() : '';

                  return (
                    <div className="mt-4 space-y-4">
                      {contains && (
                        <div>
                          <div className="font-bold text-sm md:text-sm text-gray-900 mb-1">{t('product_detail.contains')}</div>
                          <div className="text-sm md:text-sm text-gray-800 whitespace-pre-line">{contains}</div>
                        </div>
                      )}
                      {instructions && (
                        <div>
                          <div className="font-bold text-sm md:text-sm text-gray-900 mb-1">{t('product_detail.instructions')}</div>
                          <div className="text-sm md:text-sm text-gray-800 whitespace-pre-line mb-6">{instructions}</div>
                          <div className="text-sm md:text-sm italic text-gray-800 whitespace-pre-line">{t('product_detail.research_use')}</div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    className="text-sm md:text-sm text-gray-800 mt-4"
                    dangerouslySetInnerHTML={{ __html: productDescription }}
                  />
                );
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
