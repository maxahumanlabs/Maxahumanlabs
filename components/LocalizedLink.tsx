'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
import { getLocaleFromPathname, localizeHref } from '@/lib/i18n';

type Props = ComponentProps<typeof NextLink>;

/**
 * Drop-in replacement for next/link that keeps the active locale prefix
 * (`/ar`) when navigating between internal pages. Object hrefs and external
 * links pass through unchanged.
 */
export default function LocalizedLink({ href, ...rest }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const localizedHref = typeof href === 'string' ? localizeHref(href, locale) : href;

  return <NextLink href={localizedHref} {...rest} />;
}
