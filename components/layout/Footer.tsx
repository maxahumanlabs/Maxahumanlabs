'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <>
      <footer className="bg-[#1f1f1f] text-white ">
        <div className="px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-48 pt-24 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg lg:text-lg xl:text-xl 2xl:text-2xl mb-4 tracking-wide">{t('footer.quick_links').toUpperCase()}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/search" className="text-gray-300 hover:text-white text-base lg:text-base xl:text-lg 2xl:text-xl transition-colors">
                    {t('footer.search')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold text-lg lg:text-lg xl:text-xl 2xl:text-2xl mb-4 tracking-wide">{t('footer.contact').toUpperCase()}</h3>
              <div className="space-y-2">
                <a href="tel:+971558225919" className="block underline text-white hover:text-gray-300 transition-colors text-xl lg:text-xl xl:text-2xl 2xl:text-3xl">
                  +971 55 822 5919
                </a>
                <a href="mailto:info@maxahuman.com" className="block underline text-white hover:text-gray-300 transition-colors text-xl lg:text-xl xl:text-2xl 2xl:text-3xl">
                  info@maxahuman.com
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-800 pt-8 mt-8 text-gray-400 text-xs md:text-sm leading-relaxed space-y-4">
            <h4 className="font-bold text-gray-300 uppercase">RESEARCH DISCLAIMER</h4>
            <p>All products presented on this website are intended exclusively for in-vitro laboratory research and scientific investigation by qualified professionals. Nothing herein constitutes medical advice, therapeutic recommendation, or endorsement for human or animal consumption.</p>
            <p>Peptive do not advocate or condone any off-label use, self-administration, or application beyond controlled research environments. All compounds are sold strictly for academic and investigational purposes. Purchasers assume full responsibility for compliance with applicable regulations. Consultation with research ethics boards, medical advisors, and legal counsel is recommended prior to purchase.</p>
            <p>Peptive does not provide medical services, nor is it a substitute for medical consultations.</p>
            <p>All products are intended solely for laboratory research use. Any mention of potential effects is provided for informational purposes only.</p>
            <p>The statements made within this website have not been evaluated by health authorities. The statements and the products of this company are intended for research and educational purposes only.</p>
            <p>Please refer to our Terms Of Service prior to purchasing. By purchasing products, you confirm that you are at least 21 years old.</p>
          </div>
        </div>
      </footer>

      {/* Bottom Bar Section */}
      <div className="bg-[#1f1f1f] py-4">
        <div className="px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-48 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <span>©{currentYear} Maxa Human.</span>
            <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">
              {t('footer.privacy_policy')}
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/terms-of-service" className="hover:text-gray-900 transition-colors">
              {t('footer.terms_of_service')}
            </Link>
          </div>

          {/* Payment Icons */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">Pay</span>
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">G Pay</span>
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-red-600">JCB</span>
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
              <div className="flex">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 -ml-1"></div>
              </div>
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-blue-900">VISA</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
