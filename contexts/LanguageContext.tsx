'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';
import { getLocaleFromPathname, stripLocale, localizeHref, type Locale } from '@/lib/i18n';

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // The locale is driven entirely by the URL (`/ar` prefix), so refresh and
  // direct links stay in sync and there is no hydration mismatch.
  const language = getLocaleFromPathname(pathname);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    try {
      localStorage.setItem('language', language);
    } catch {
      // ignore (e.g. private mode)
    }
  }, [language]);

  const setLanguage = (lang: Locale) => {
    if (lang === language) return;
    // Navigate to the same page under the target locale, preserving query + hash.
    const bare = stripLocale(pathname);
    const search = typeof window !== 'undefined' ? window.location.search + window.location.hash : '';
    router.push(localizeHref(bare, lang) + search);
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let value: any = translations[language];

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return path; // Return the key if translation not found
      }
    }

    return typeof value === 'string' ? value : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
