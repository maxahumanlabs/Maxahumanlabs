import type { Metadata } from 'next';
import { localeFromHeaders, pageMetadata } from '@/lib/seo';
import { webApplicationSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const locale = localeFromHeaders();
  return pageMetadata('/pages/dosage-calculator', locale, {
    en: {
      title: 'Peptide Dosage Calculator | Free Research Tool | Maxa Human',
      description:
        'Calculate research peptide dosages with our free tool. Reference ranges for BPC-157, GHK-Cu, MOTS-c & 20+ peptides.',
    },
    ar: {
      title: 'حاسبة جرعات الببتيدات البحثية | أداة مجانية | مكسا هيومن',
      description:
        'احسب جرعات الببتيدات البحثية بأداتنا المجانية. نطاقات مرجعية لـ BPC-157 وGHK-Cu وMOTS-c وأكثر من 20 ببتيد.',
    },
  });
}

export default function DosageCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={webApplicationSchema(
          'Peptide Dosage Calculator',
          'Free research tool to calculate peptide reconstitution and dosing for laboratory study.',
          '/pages/dosage-calculator'
        )}
      />
      {children}
    </>
  );
}
