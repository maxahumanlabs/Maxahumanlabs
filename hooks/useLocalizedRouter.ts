'use client';

import { useRouter, usePathname } from 'next/navigation';
import { getLocaleFromPathname, localizeHref } from '@/lib/i18n';

type NavOptions = Parameters<ReturnType<typeof useRouter>['push']>[1];

/**
 * Locale-aware wrapper around next/navigation's useRouter.
 * push/replace automatically carry the active locale prefix (`/ar`);
 * back/forward/refresh/prefetch are forwarded as-is.
 */
export function useLocalizedRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  return {
    ...router,
    push: (href: string, options?: NavOptions) => router.push(localizeHref(href, locale), options),
    replace: (href: string, options?: NavOptions) => router.replace(localizeHref(href, locale), options),
  };
}
