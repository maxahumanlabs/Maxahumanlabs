"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types';
import { wordpress } from '@/lib/wordpress';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: t('hero_slider.slide1.title'),
      description: t('hero_slider.slide1.description'),
      image: "https://slategrey-zebra-234644.hostingersite.com/wp-content/uploads/2026/04/ghkcu.webp",
      url: "/products/ghk-cu-50mg"
    },
    {
      title: t('hero_slider.slide2.title'),
      description: t('hero_slider.slide2.description'),
      image: "https://slategrey-zebra-234644.hostingersite.com/wp-content/uploads/2026/04/motsc.webp",
      url: "/products/mots-c-10mg"
    },
    {
      title: t('hero_slider.slide3.title'),
      description: t('hero_slider.slide3.description'),
      image: "https://slategrey-zebra-234644.hostingersite.com/wp-content/uploads/2026/04/slupp.webp",
      url: "/products/slu-pp-332-250-mcg-60-capsules"
    },
    {
      title: t('hero_slider.slide4.title'),
      description: t('hero_slider.slide4.description'),
      image: "https://slategrey-zebra-234644.hostingersite.com/wp-content/uploads/2026/04/Tb500-bpc.webp",
      url: "/products/tb-500-10mg-bpc-157-10mg-wolverine-stack"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);


    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch products on client side to avoid build errors
    async function loadProducts() {
      try {
        const { woocommerce } = await import('@/lib/woocommerce');
        const products = await woocommerce.getFeaturedProducts(4);
        setFeaturedProducts(products);

        // Fetch trending products from "trending" category
        const trending = await woocommerce.getProducts({ category: 'trending', perPage: 10 });
        setTrendingProducts(trending);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    loadProducts();
  }, []);

  const faqs = [
    {
      question: t('faqs.questions.0.question'),
      answer: t('faqs.questions.0.answer')
    },
    {
      question: t('faqs.questions.1.question'),
      answer: t('faqs.questions.1.answer')
    },
    {
      question: t('faqs.questions.2.question'),
      answer: t('faqs.questions.2.answer')
    },
    {
      question: t('faqs.questions.3.question'),
      answer: t('faqs.questions.3.answer')
    },
    {
      question: t('faqs.questions.4.question'),
      answer: t('faqs.questions.4.answer')
    },
    {
      question: t('faqs.questions.5.question'),
      answer: t('faqs.questions.5.answer')
    },
    {
      question: t('faqs.questions.6.question'),
      answer: t('faqs.questions.6.answer')
    },
    {
      question: t('faqs.questions.7.question'),
      answer: t('faqs.questions.7.answer')
    },
    {
      question: t('faqs.questions.8.question'),
      answer: t('faqs.questions.8.answer')
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };


  return (
    <div>
      {/* Hero Section Slider */}
      <section className="relative w-full bg-gradient-to-br from-[#f3eef9] to-[#ffffff] overflow-hidden min-h-[680px] md:min-h-[600px] flex items-center py-16 pb-28 md:py-20 md:pb-20">
        
        {/* Soft Bubbles Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#e8deff]/40 blur-3xl" />
          <div className="absolute top-[20%] -right-[5%] w-[40%] h-[40%] rounded-full bg-white/60 blur-3xl" />
          <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-[#e8deff]/60 blur-3xl" />
        </div>

        {/* Logo Background with low opacity */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
          <Image
            src="/logo.svg"
            alt="Maxa Human Logo Background"
            width={800}
            height={800}
            className="w-[120%] md:w-full object-contain"
          />
        </div>

        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            <div className="px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-8 relative z-20">
              {/* Product Image */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-56 h-80 md:w-80 md:h-[500px] lg:w-[400px] lg:h-[600px] transition-all duration-500">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className={`w-full md:w-1/2 text-center ${language === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#3b2760] mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-[#3b2760]/80 text-sm md:text-base lg:text-lg mb-6 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
                  {slide.description}
                </p>
                <Link href={slide.url}>
                  <button className="bg-transparent border-2 border-[#3b2760] text-[#3b2760] px-6 py-2.5 text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#3b2760] hover:text-white shadow-sm inline-block">
                    {t('hero_slider.buy_now') || 'BUY NOW →'}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                ? 'bg-white scale-110 shadow-md ring-2 ring-white/50'
                : 'bg-white/40 hover:bg-white/70 ring-2 ring-white/20'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Brand Statement Section */}
      <section className="py-12 bg-white">
        <div className="px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-48 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-gray-900 inline-flex items-center justify-center flex-wrap gap-x-3">
            <span>{t('brand.research')}</span>
            <span className="inline-flex items-center justify-center w-14 h-14 lg:w-24 xl:w-24 2xl:w-24 lg:h-24 xl:h-24 2xl:h-24">
              <Image
                src="/logo.svg"
                alt="Maxa Human Logo"
                width={80}
                height={80}
                className="w-full h-full rounded-lg object-cover"
              />
            </span>
            <span>{t('brand.starts_with')}</span>
            <span className="relative inline-block">
              {t('brand.maxa')}
              <span className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-transparent w-full animate-underline-slide"></span>
            </span>
          </h2>
        </div>
      </section>


      {/* Trending Research Section */}
      <section className="py-8 bg-white">
        <div className="px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-48">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl text-gray-900">
              {t('trending.title')}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const container = document.querySelector('#trending-carousel');
                  if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="relative w-14 h-14 rounded-full bg-white border-2 border-gray-900 flex items-center justify-center overflow-hidden group transition-colors"
                aria-label="Previous"
              >
                {/* Liquid fill animation background */}
                <span className="absolute inset-0 bg-gray-900 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-full"></span>

                <svg className="relative z-10 w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const container = document.querySelector('#trending-carousel');
                  if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="relative w-14 h-14 rounded-full bg-white border-2 border-gray-900 flex items-center justify-center overflow-hidden group transition-colors"
                aria-label="Next"
              >
                {/* Liquid fill animation background */}
                <span className="absolute inset-0 bg-gray-900 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-full"></span>

                <svg className="relative z-10 w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Carousel - Full Width */}
        <div id="trending-carousel" className="overflow-x-auto scrollbar-hide scroll-smooth">
          <div className="flex gap-6 px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-48 pb-6">
            {trendingProducts.length > 0 ? (
              trendingProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="flex-none w-64 md:w-72 lg:w-80 xl:w-[340px] 2xl:w-[360px]">
                  <div className="relative bg-gray-50 rounded-xl overflow-hidden shadow-sm group h-full">
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      {product.onSale && product.regularPrice && product.salePrice && (
                        <span className="bg-red-500 text-white text-xs lg:text-xs xl:text-sm 2xl:text-sm font-bold px-4 py-1.5 rounded-full">
                          Save {Math.round(((parseFloat(product.regularPrice) - parseFloat(product.salePrice)) / parseFloat(product.regularPrice)) * 100)}%
                        </span>
                      )}
                      {product.stockStatus !== 'instock' && (
                        <span className="bg-gray-300 text-gray-700 text-xs lg:text-xs xl:text-sm 2xl:text-sm font-bold px-4 py-1.5 rounded-full">
                          Sold Out
                        </span>
                      )}
                    </div>

                    {/* Product Image with slide transition */}
                    <div className="relative bg-gray-100 aspect-square flex items-center justify-center overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <>
                          {/* First Image */}
                          <img
                            src={product.images[0] || '/placeholder.jpg'}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:-translate-x-full"
                          />
                          {/* Second Image - slides in from right */}
                          <img
                            src={product.images[1] || product.images[0] || '/placeholder.jpg'}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out translate-x-full group-hover:translate-x-0"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="bg-gray-50 p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-500 text-xs lg:text-xs xl:text-sm 2xl:text-sm mb-1 uppercase tracking-wide">
                            Maxa Human
                          </p>
                          <h3 className="text-gray-900 text-base lg:text-base xl:text-lg 2xl:text-xl font-medium">{language === 'ar' && (product as any).arabic_name ? (product as any).arabic_name : product.name}</h3>
                        </div>
                        <div className="text-right ml-3">
                          <p className="text-red-500 font-semibold text-base lg:text-base xl:text-lg 2xl:text-xl whitespace-nowrap">
                            Dhs. {parseFloat(product.price).toFixed(2)}
                          </p>
                          {product.onSale && product.regularPrice && parseFloat(product.regularPrice) > parseFloat(product.price) && (
                            <p className="text-gray-400 text-sm lg:text-sm xl:text-base 2xl:text-lg line-through whitespace-nowrap">
                              Dhs. {parseFloat(product.regularPrice).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-none w-80">
                <div className="bg-gray-100 rounded-3xl p-8 text-center">
                  <p className="text-gray-500 lg:text-sm xl:text-base 2xl:text-lg">No trending products available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>




      {/* Why Maxa Human Section */}
      <section className="py-16 bg-white">
        <div className="px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-48">
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl font-bold text-center text-gray-900 mb-12">
            {t('why_maxa.title')}
          </h2>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Precision-Focused Card */}
            <div className="bg-[#f6f6f6] rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base lg:text-lg xl:text-xl font-bold text-gray-900 mb-2">{t('why_maxa.precision.title')}</h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-normal">
                    {t('why_maxa.precision.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* No Middlemen Card */}
            <div className="bg-[#f6f6f6] rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base lg:text-lg xl:text-xl font-bold text-gray-900 mb-2">{t('why_maxa.middlemen.title')}</h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-normal">
                    {t('why_maxa.middlemen.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Boldly Disruptive Card */}
            <div className="bg-[#f6f6f6] rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base lg:text-lg xl:text-xl font-bold text-gray-900 mb-2">{t('why_maxa.disruptive.title')}</h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-normal">
                    {t('why_maxa.disruptive.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee Section */}
          <div className="relative overflow-hidden bg-white py-8 -mx-6 sm:-mx-8 md:-mx-12 lg:-mx-12 xl:-mx-12 2xl:-mx-48">
            <div className="flex animate-marquee-fast whitespace-nowrap">
              <div className="flex items-center gap-12 px-6">
                <span className="relative inline-block text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-black text-gray-900 pb-3">
                  {t('moving_text.stimulating_peptides')}
                  <svg className="absolute -bottom-1 left-0 w-full h-2 animate-wave" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" stroke="url(#gradient)" strokeWidth="2" fill="none" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#eab308" />
                        <stop offset="100%" stopColor="#ca8a04" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span className="text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-black text-gray-900">{t('moving_text.research_grade_peptides')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span className="relative inline-block text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-black text-gray-900 pb-3">
                  {t('moving_text.stimulating_peptides')}
                  <svg className="absolute -bottom-1 left-0 w-full h-2 animate-wave" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" stroke="url(#gradient)" strokeWidth="2" fill="none" />
                  </svg>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span className="text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-black text-gray-900">{t('moving_text.research_grade_peptides')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              </div>
              <div className="flex items-center gap-12 px-6">
                <span className="relative inline-block text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-black text-gray-900 pb-3">
                  {t('moving_text.stimulating_peptides')}
                  <svg className="absolute -bottom-1 left-0 w-full h-2 animate-wave" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" stroke="url(#gradient)" strokeWidth="2" fill="none" />
                  </svg>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span className="text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-black text-gray-900">{t('moving_text.research_grade_peptides')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span className="relative inline-block text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-black text-gray-900 pb-3">
                  {t('moving_text.stimulating_peptides')}
                  <svg className="absolute -bottom-1 left-0 w-full h-2 animate-wave" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" stroke="url(#gradient)" strokeWidth="2" fill="none" />
                  </svg>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span className="text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-8xl font-black text-gray-900">{t('moving_text.research_grade_peptides')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="pt-6 pb-8 bg-white">
        <div className="px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-48">
          <div className="max-w-4xl mx-auto space-y-3">
            <h2 className="text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl font-bold text-gray-900 mb-8">
              {t('faqs.title')}
            </h2>

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#f6f6f6] rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-medium text-gray-900 text-base lg:text-base xl:text-lg 2xl:text-xl pr-6">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 text-gray-900 text-2xl font-light">
                    {openFaqIndex === index ? '−' : '+'}
                  </span>
                </button>

                {openFaqIndex === index && (
                  <div className="px-5 pb-4">
                    <p className="text-gray-600 text-sm lg:text-sm xl:text-base 2xl:text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ...existing code... */}

    </div>

  );
}
