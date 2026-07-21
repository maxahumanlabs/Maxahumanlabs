import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import WelcomePopup from '@/components/WelcomePopup';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maxahumanlabs.com'),
  title: {
    default: 'Maxa Human | Precision Crafted Research Peptides',
    template: '%s | Maxa Human'
  },
  description: 'Maxa Human provides high-purity compounds and research peptides with independent lab verification. Trusted by researchers for uncompromised quality and precision.',
  keywords: 'research peptides, peptides, supplements, SARMs, Maxa, Maxahuman, Maxa Human, Maxa Human Labs, Maxa peptides, lab verified peptides, GHK-Cu, BPC-157, research compounds, high purity peptides',
  authors: [{ name: 'Maxa Human' }],
  creator: 'Maxa Human',
  publisher: 'Maxa Human',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Site-level OG/Twitter fallback (used by pages that don't set their own).
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.maxahumanlabs.com',
    siteName: 'Maxa Human',
    title: 'Maxa Human | Precision Crafted Research Peptides',
    description: 'High-purity compounds. Independent lab verification. Trusted by researchers seeking uncompromised quality.',
    images: [
      {
        url: 'https://www.maxahumanlabs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Maxa Human',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maxa Human | Precision Crafted Research Peptides',
    description: 'High-purity compounds. Independent lab verification. Trusted by researchers seeking uncompromised quality.',
    images: ['https://www.maxahumanlabs.com/og-image.png'],
  },
  // NOTE: no global `alternates.canonical` — each page sets its own self-referencing
  // canonical + hreflang (see lib/seo.ts). Pages without one fall back to the crawled URL.
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // `lang`/`dir` default to English for SSR and are corrected on the client by
  // LanguageContext based on the `/ar` URL prefix. Kept static so product pages
  // keep their ISR (revalidate) instead of being forced into dynamic rendering.
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MV62L3GV');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MV62L3GV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <CartSidebar />
            <WelcomePopup />
            <WhatsAppButton />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
