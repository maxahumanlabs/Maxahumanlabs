const fs = require('fs');

let content = fs.readFileSync('app/checkout/page.tsx', 'utf8');

// 1. Add import
if (!content.includes("import { openWhatsAppOrder }")) {
  content = content.replace(
    "import { useLanguage } from '@/contexts/LanguageContext';",
    "import { useLanguage } from '@/contexts/LanguageContext';\nimport { openWhatsAppOrder } from '@/lib/whatsapp';"
  );
}

// 2. Replace handleSubmit
const handleSubmitRegex = /const handleSubmit = async \(e: React\.FormEvent\) => \{[\s\S]*?\n  \};\n/m;
const newHandleSubmit = `const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderLines = items.map(item => ({
        name: item.name,
        arabicName: item.arabic_name,
        price: item.price,
        quantity: item.quantity,
        bundleLabel: item.bundleLabel,
      }));

      openWhatsAppOrder(orderLines, language as 'en' | 'ar');
      setLoading(false);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError('An error occurred while preparing your order');
      setLoading(false);
    }
  };\n`;

content = content.replace(handleSubmitRegex, newHandleSubmit);

fs.writeFileSync('app/checkout/page.tsx', content);
console.log('Checkout updated');
