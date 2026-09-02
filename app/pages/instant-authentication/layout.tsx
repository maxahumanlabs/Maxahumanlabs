import type { Metadata } from 'next';

/**
 * The page itself is a client component and cannot export metadata, so the
 * noindex lives here.
 *
 * This route is the destination of the QR code printed on packaging — it is
 * meant to be reached by scanning a vial, not from search results, where a
 * standalone "your product is authenticated" page reads as misleading.
 *
 * Deliberately NOT added to the robots.txt disallow list: a disallowed URL can
 * still be indexed from external links, and blocking the crawler would stop it
 * from ever seeing this noindex.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function InstantAuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
