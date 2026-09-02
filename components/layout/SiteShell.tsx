'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import WelcomePopup from '@/components/WelcomePopup';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

/**
 * Routes rendered without any site chrome — no announcement bar, header, footer,
 * cart, welcome popup or WhatsApp button.
 *
 * `/pages/instant-authentication` is the destination of the QR code printed on
 * every package. It must be a dead end: a customer scanning a vial should see
 * the authenticity confirmation and nothing that navigates them elsewhere.
 */
const BARE_ROUTES = ['/pages/instant-authentication'];

/** `/ar/...` URLs are rewritten by middleware, so strip the locale prefix before matching. */
function withoutLocale(pathname: string) {
  if (pathname === '/ar') return '/';
  return pathname.startsWith('/ar/') ? pathname.slice(3) : pathname;
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const path = withoutLocale(pathname).replace(/\/+$/, '') || '/';

  if (BARE_ROUTES.includes(path)) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartSidebar />
      <WelcomePopup />
      <WhatsAppButton />
    </div>
  );
}
