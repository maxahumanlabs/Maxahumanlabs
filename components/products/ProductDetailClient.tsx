'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, buildWhatsAppUrl } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import RelatedProducts from './RelatedProducts';

type BundleOption = {
  id: string;
  months: number;
  label: string;
  price: number;
  savings?: number;
  savingsPercent?: number;
  isPopular?: boolean;
  tag: string;
  bottles: number;
  freeGifts: { id: string; label: string; price: number }[];
};

const MYSTERY_IMAGES = [
  '/Mystery Supplement 1.png',
  '/Mystery Supplement 2.png',
  '/Mystery Supplement 3.png',
];

function GiftIcon({ id, className }: { id: string; className?: string }) {
  switch (id) {
    case 'shipping':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11M14 9h4l4 4v5c0 .6-.4 1-1 1h-2" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      );
    case 'bac':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69s-6 6.36-6 11.06a6 6 0 0012 0c0-4.7-6-11.06-6-11.06z" />
        </svg>
      );
    case 'ebook':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'ai':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      );
    case 'mystery':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M21 11.25H3M21 11.25a1.125 1.125 0 001.125-1.125v-1.5A1.125 1.125 0 0021 7.5H3a1.125 1.125 0 00-1.125 1.125v1.5C1.875 10.746 2.379 11.25 3 11.25M12 7.5V21m0-13.5a2.625 2.625 0 10-2.625-2.625C9.375 6.34 10.66 7.5 12 7.5zm0 0a2.625 2.625 0 112.625-2.625C14.625 6.34 13.34 7.5 12 7.5z" />
        </svg>
      );
    default:
      return null;
  }
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState('three-months');
  const [email, setEmail] = useState('');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const currentPrice = parseFloat(product.salePrice || product.price);
  const originalPrice = parseFloat(product.regularPrice || product.price);
  const savingsPerItem = originalPrice - currentPrice;
  const savingsPercentPerItem = originalPrice > 0 ? ((savingsPerItem / originalPrice) * 100) : 0;
  const bundlePricing = (product as any).bundle_pricing || {};
  const hasValue = (val: any) => val !== null && val !== undefined && val !== '' && parseFloat(val) > 0;

  const twoMonthRegular = hasValue(bundlePricing.two_month?.regular_price)
    ? parseFloat(bundlePricing.two_month.regular_price)
    : originalPrice * 2;
  const twoMonthSale = hasValue(bundlePricing.two_month?.sale_price)
    ? parseFloat(bundlePricing.two_month.sale_price)
    : (hasValue(bundlePricing.two_month?.regular_price) ? twoMonthRegular : (currentPrice * 2 * 0.90));
  const twoMonthSavings = twoMonthRegular - twoMonthSale;
  const twoMonthSavingsPercent = twoMonthRegular > 0 ? ((twoMonthSavings / twoMonthRegular) * 100) : 0;

  const threeMonthRegular = hasValue(bundlePricing.three_month?.regular_price)
    ? parseFloat(bundlePricing.three_month.regular_price)
    : originalPrice * 3;
  const threeMonthSale = hasValue(bundlePricing.three_month?.sale_price)
    ? parseFloat(bundlePricing.three_month.sale_price)
    : (hasValue(bundlePricing.three_month?.regular_price) ? threeMonthRegular : (currentPrice * 3 * 0.85));
  const threeMonthSavings = threeMonthRegular - threeMonthSale;
  const threeMonthSavingsPercent = threeMonthRegular > 0 ? ((threeMonthSavings / threeMonthRegular) * 100) : 0;

  const bundleOptions: BundleOption[] = [
    {
      id: 'three-months',
      months: 3,
      label: t('bundle.three_months'),
      price: threeMonthSale,
      savings: threeMonthSavings,
      savingsPercent: Math.round(threeMonthSavingsPercent),
      isPopular: true,
      tag: t('bundle.tag_three_months'),
      bottles: 3,
      freeGifts: [
        { id: 'shipping', label: t('bundle.gift_free_shipping'), price: 200 },
        { id: 'bac', label: t('bundle.gift_bac_water'), price: 450 },
        { id: 'ebook', label: t('bundle.gift_ebook'), price: 299 },
        { id: 'ai', label: t('bundle.gift_ai_coach'), price: 99 },
        { id: 'mystery', label: t('bundle.gift_mystery'), price: 999 },
      ],
    },
    {
      id: 'two-months',
      months: 2,
      label: t('bundle.two_months'),
      price: twoMonthSale,
      savings: twoMonthSavings,
      savingsPercent: Math.round(twoMonthSavingsPercent),
      tag: t('bundle.tag_two_months'),
      bottles: 2,
      freeGifts: [
        { id: 'shipping', label: t('bundle.gift_free_shipping'), price: 200 },
        { id: 'bac', label: t('bundle.gift_bac_water'), price: 300 },
        { id: 'ebook', label: t('bundle.gift_ebook'), price: 299 },
        { id: 'ai', label: t('bundle.gift_ai_coach'), price: 99 },
      ],
    },
    {
      id: 'one-month',
      months: 1,
      label: t('bundle.one_month'),
      price: currentPrice,
      savings: savingsPerItem,
      savingsPercent: Math.round(savingsPercentPerItem),
      tag: t('bundle.tag_one_month'),
      bottles: 1,
      freeGifts: [
        { id: 'shipping', label: t('bundle.gift_free_shipping'), price: 200 },
        { id: 'bac', label: t('bundle.gift_bac_water'), price: 150 },
      ],
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
      bundleType: selectedBundle as 'one-month' | 'two-months' | 'three-months',
      bundleLabel: bundle.label,
      arabicName: (product as any).arabic_name || '',
    });
  };

  const handleBuyNow = () => {
    const bundle = bundleOptions.find((item) => item.id === selectedBundle);
    if (!bundle) return;

    const message = `Hello, I'd like to order:\n\n• ${product.name} (${bundle.label}) — ${formatPrice(bundle.price)}`;
    window.open(buildWhatsAppUrl(message), '_blank');
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    image: product.images,
    description: productShortDescription?.replace(/<[^>]+>/g, '') || productName,
    sku: product.id.toString(),
    brand: {
      '@type': 'Brand',
      name: 'Maxa Human',
    },
    offers: {
      '@type': 'Offer',
      url: `https://maxahumanlabs.com/products/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: isOutOfStock ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2869',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 md:px-12 lg:px-12 xl:px-12 2xl:px-48 py-16 md:py-20 lg:py-20 xl:py-20 2xl:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                  className={`relative aspect-square bg-white rounded-2xl overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
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

            <div className="space-y-4 lg:space-y-4 xl:space-y-4 2xl:space-y-5 pt-2">
              {bundleOptions.map((bundle) => {
                const isSelected = selectedBundle === bundle.id;
                const hasGifts = bundle.freeGifts.length > 0;
                const hasSavings = (bundle.savings ?? 0) > 0;
                return (
                  <label
                    key={bundle.id}
                    className={`relative block rounded-2xl border-2 cursor-pointer transition-all ${isSelected
                        ? 'border-gray-900 shadow-md'
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    <div className="absolute -top-3 right-4 z-10">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wide shadow-sm bg-black text-white">
                        {bundle.tag}
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-[14px]">
                    <div
                      className={`flex items-center gap-3 p-3 lg:p-3 xl:p-3 2xl:p-4 ${isSelected ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <input
                        type="radio"
                        name="bundle"
                        value={bundle.id}
                        checked={isSelected}
                        onChange={(e) => setSelectedBundle(e.target.value)}
                        className="w-4 h-4 text-gray-900 focus:ring-gray-900 flex-shrink-0"
                      />
                      <div className="relative w-14 h-14 2xl:w-16 2xl:h-16 flex-shrink-0 rounded-xl overflow-hidden bg-[#f3f3f3] border border-gray-200">
                        <Image
                          src={product.image}
                          alt={productName}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm md:text-base lg:text-base xl:text-base font-bold text-gray-900">
                            {bundle.label}
                          </span>
                          {hasSavings && (
                            <span className="bg-[#ecfccb] text-[#4d7c0f] text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md">
                              {bundle.savingsPercent}% {t('bundle.off')}
                            </span>
                          )}
                        </div>
                        <div className="text-xs md:text-xs lg:text-xs xl:text-xs text-gray-500 mt-0.5">
                          {bundle.bottles}{' '}
                          {bundle.bottles === 1 ? t('bundle.bottle') : t('bundle.bottles')}
                          {hasGifts && ` + ${bundle.freeGifts.length} ${t('bundle.free_gifts')}`}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-base md:text-lg lg:text-lg xl:text-lg font-bold text-gray-900">
                          {formatPrice(bundle.price)}
                        </div>
                        {hasSavings && (
                          <div className="text-xs md:text-xs lg:text-xs xl:text-xs text-gray-400 line-through">
                            {formatPrice(originalPrice * bundle.months)}
                          </div>
                        )}
                      </div>
                    </div>

                    {hasGifts && (
                      <div
                        className={`border-t border-black/10 divide-y ${isSelected ? 'divide-white/15' : 'divide-black/10'
                          }`}
                      >
                        {bundle.freeGifts.map((gift) => (
                          <div
                            key={gift.id}
                            className={`flex items-center justify-between gap-2 px-3 lg:px-4 py-1 ${isSelected ? 'bg-black' : 'bg-[#f6faff]'
                              }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                                {gift.id === 'mystery' ? (
                                  <span className="flex items-center flex-shrink-0">
                                    {MYSTERY_IMAGES.map((src, i) => (
                                      <span key={i} className="relative w-5 h-5">
                                        <Image
                                          src={src}
                                          alt={gift.label}
                                          fill
                                          className="object-contain"
                                          sizes="20px"
                                        />
                                      </span>
                                    ))}
                                  </span>
                                ) : (
                                  <span className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                                    <GiftIcon
                                      id={gift.id}
                                      className={`w-[18px] h-[18px] ${isSelected ? 'text-white' : 'text-black'}`}
                                    />
                                  </span>
                                )}
                                <span
                                  className={`text-xs md:text-sm truncate ${isSelected ? 'text-white' : 'text-gray-700'
                                    }`}
                                >
                                  {gift.label}
                                </span>
                              </div>
                              <span className="flex items-center gap-1.5 flex-shrink-0">
                                <span
                                  className={`text-[10px] md:text-xs font-bold ${isSelected ? 'text-white' : 'text-[#4d7c0f]'
                                    }`}
                                >
                                  {t('bundle.free')}
                                </span>
                                <span
                                  className={`text-[10px] md:text-xs line-through ${isSelected ? 'text-white/50' : 'text-gray-400'
                                    }`}
                                >
                                  {gift.price} {t('bundle.currency')}
                                </span>
                              </span>
                            </div>
                        ))}
                      </div>
                    )}
                    </div>
                  </label>
                );
              })}
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
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full flex items-center justify-center bg-black text-white text-sm md:text-base py-4 lg:py-4 xl:py-4 2xl:py-5 px-6 rounded-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center">
                <span>{t('bundle.buy_now')}</span>
              </span>
            </button>
          </div>

          <div className="order-7 pt-4 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('product_detail.description_title')}</h3>
            
            <div className={`relative transition-all duration-500 overflow-hidden ${isDescriptionExpanded ? 'max-h-[5000px]' : 'max-h-[120px]'}`}>
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
              
              {!isDescriptionExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
              )}
            </div>
            
            <button 
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-4 text-gray-900 font-bold text-sm flex items-center gap-1 hover:text-gray-700 transition-colors"
            >
              <span>{isDescriptionExpanded ? t('product_detail.read_less') : t('product_detail.read_more')}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isDescriptionExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {product.relatedIds && product.relatedIds.length > 0 && (
        <div className="mt-24 pt-12 border-t border-gray-200">
          <RelatedProducts productIds={product.relatedIds} currentProductId={product.id} />
        </div>
      )}
    </div>
  );
}
