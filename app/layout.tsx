import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import WelcomePopup from '@/components/WelcomePopup';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://maxahumanlabs.com',
    siteName: 'Maxa Human',
    title: 'Maxa Human | Precision Crafted Research Peptides',
    description: 'High-purity compounds. Independent lab verification. Trusted by researchers seeking uncompromised quality.',
    images: [
      {
        url: 'https://maxahumanlabs.com/og-image.png',
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
    images: ['https://maxahumanlabs.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://maxahumanlabs.com',
  },
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
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable}`}>
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
            {/* WhatsApp Button - global */}
            <a
              href="https://wa.me/971528107166"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-4 left-4 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
              aria-label="Chat on WhatsApp"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
