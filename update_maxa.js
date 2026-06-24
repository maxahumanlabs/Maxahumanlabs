const fs = require('fs');

// 1. Update CartSidebar.tsx
let file = 'components/cart/CartSidebar.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('const { t } = useLanguage();', 'const { t, language } = useLanguage();');
content = content.replace('getCartWhatsAppUrl(items)', 'getCartWhatsAppUrl(items, language)');
fs.writeFileSync(file, content);

// 2. Update app/cart/page.tsx
file = 'app/cart/page.tsx';
content = fs.readFileSync(file, 'utf8');
if (!content.includes('useLanguage')) {
  content = content.replace("import Button from '@/components/ui/Button';", "import Button from '@/components/ui/Button';\nimport { useLanguage } from '@/contexts/LanguageContext';");
}
content = content.replace('const { items, clearCart, getSubtotal } = useCartStore();', 'const { items, clearCart, getSubtotal } = useCartStore();\n  const { t, language } = useLanguage();');
content = content.replace('getCartWhatsAppUrl(items)', 'getCartWhatsAppUrl(items, language)');
fs.writeFileSync(file, content);

// 3. Update ProductDetailClient.tsx
file = 'components/products/ProductDetailClient.tsx';
content = fs.readFileSync(file, 'utf8');

const oldHandleBuyNow = `  const handleBuyNow = () => {
    const bundle = bundleOptions.find((item) => item.id === selectedBundle);
    if (!bundle) return;

    const message = \`Hello, I'd like to order:\\n\\n• \${product.name} (\${bundle.label}) — \${formatPrice(bundle.price)} + Tax\`;
    window.open(buildWhatsAppUrl(message), '_blank');
  };`;

const newHandleBuyNow = `  const handleBuyNow = () => {
    const bundle = bundleOptions.find((item) => item.id === selectedBundle);
    if (!bundle) return;

    const L = language === 'ar' ? {
      intro: "مرحباً، أود طلب:",
      tax: "+ ضريبة",
    } : {
      intro: "Hello, I'd like to order:",
      tax: "+ Tax",
    };

    const displayName = language === 'ar' && (product as any).arabic_name ? (product as any).arabic_name : product.name;
    const message = \`\${L.intro}\\n\\n• \${displayName} (\${bundle.label}) — \${formatPrice(bundle.price)} \${L.tax}\`;
    window.open(buildWhatsAppUrl(message), '_blank');
  };`;

content = content.replace(oldHandleBuyNow, newHandleBuyNow);
fs.writeFileSync(file, content);

console.log('Maxa Human whatsapp integration updated.');
