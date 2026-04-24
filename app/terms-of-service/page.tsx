"use client";

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TermsOfServicePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            {t('products.breadcrumb_home')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Terms of service</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Terms of service
          </h1>
          <p className="text-gray-600">Web Terms of Use</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <p>
              Welcome, and thank you for your interest in Maxa Human (&quot;Maxa Human&quot; &quot;we,&quot; or &quot;us&quot;) and our website at www.maxahuman.com along with our related sites (collectively, the &quot;Site&quot;).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Site Overview</h2>
            <p>
              Maxa Human supplies peptides and bioregulators for research purposes. The Site provides information about our company, products, and services for informational purposes only. It is not intended as a substitute for professional advice or services.
            </p>
            <p>
              Use of the Site does not establish any professional-to-user relationship with Maxa Human. Always seek guidance from qualified professionals for specific advice or services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Modification of Terms & Site</h2>
            <p>
              We reserve the right to change these Terms of Use at any time, with updates effective upon publication. Your continued access or use constitutes your acceptance of the updated Terms. We may also modify, suspend, or discontinue features of the Site at any time, without notice, and are not liable for any changes or interruptions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Permissible Use</h2>
            <p>Except as prohibited by applicable law, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reproduce, distribute, display, or perform Site content without authorization.</li>
              <li>Modify or create derivative works based on the Site or any materials.</li>
              <li>Interfere with or bypass security features or other controls of the Site.</li>
            </ul>
            <p>
              Do not submit any information you consider confidential through the Site. Any feedback—such as suggestions or ideas—is provided on a non-confidential basis, and we may use such feedback as we see fit.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Research Disclaimer, Eligibility & Responsibility</h2>
            <p>
              All products presented on this website are intended exclusively for in-vitro laboratory research and scientific investigation by qualified professionals. Nothing on this Site constitutes medical advice, therapeutic recommendation, diagnosis, treatment, or endorsement for human or animal consumption.
            </p>
            <p>
              Maxa Human does not advocate or condone any off-label use, self-administration, or application beyond controlled research environments. All compounds are sold strictly for academic and investigational purposes. Any mention of potential effects is provided for informational purposes only. Statements on this Site have not been evaluated by health authorities.
            </p>
            <p>By accessing the Site, viewing products, or placing an order, you represent and warrant that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are at least 21 years old;</li>
              <li>You are a qualified researcher/professional purchasing solely for lawful research purposes;</li>
              <li>You will use, handle, store, and dispose of all products in compliance with applicable laws, regulations, and laboratory safety standards;</li>
              <li>You will not purchase, use, distribute, or resell any product for human or animal use, clinical/diagnostic use, or any prohibited purpose.</li>
            </ul>
            <p>
              You are solely responsible for ensuring the legality and compliance of your purchase, importation, possession, handling, and intended use in your jurisdiction. You are responsible for providing accurate order and shipping information. If you provide recipient or third-party information (name, address, phone number), you represent that you have the lawful right to provide it for order fulfillment.
            </p>
            <p>
              To the maximum extent permitted by law, Maxa Human is not responsible for any misuse of products, improper handling, or use inconsistent with these Terms, and you assume all risks associated with purchase, possession, handling, and use of any products.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Prohibited Conduct</h2>
            <p>You agree not to use the Site for any of the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Illegal activities or in violation of any law or regulation.</li>
              <li>Violation of rights of third parties, including intellectual property rights.</li>
              <li>Interfering with security features, networks, or servers.</li>
              <li>Disrupting other users&apos; experience or the operation of the Site.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Ownership & Intellectual Property</h2>
            <p>
              The Site and all its content—such as design, graphics, code, and materials—are owned by Maxa Human or its licensors. Protected by applicable intellectual property laws, they are not to be used without our explicit permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Third-Party Links</h2>
            <p>
              The Site may include links to third-party websites. We do not control those websites, and are not responsible for their content or privacy practices.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">8. Indemnity & Limitation of Liability</h2>
            <p>
              You agree to indemnify Maxa Human, its affiliates, officers, and employees against any claims, losses, or damages arising from your violation of these Terms.
            </p>
            <p>
              To the extent permitted by law, Maxa Human and its affiliates will not be liable for any indirect, incidental, special or consequential damages arising from your use of the site. Our total liability will not exceed the amount paid by you (if any) to use the site in the six months prior to the event giving rise to liability.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">9. General Terms</h2>
            <p>
              These Terms, together with our Privacy Policy and any other incorporated agreements, constitute the full agreement between you and Maxa Human regarding your use of the Site. Waiver of any provision does not constitute a waiver of future enforcement. If any provision is invalid or unenforceable, it will be modified as minimally as possible, with the rest remaining in force.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
