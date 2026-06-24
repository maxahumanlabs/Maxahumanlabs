import { CartItem } from '@/types';

// Format price to currency string (UAE Dirham)
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `Dhs. ${numPrice.toFixed(2)}`;
}

// Calculate cart total
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);
}

// Calculate cart item count
export function calculateCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

// Generate star rating display
export function generateStarRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Strip HTML tags
export function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Generate slug from string
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Get stock status label
export function getStockStatusLabel(status: string): string {
  const labels: { [key: string]: string } = {
    instock: 'In Stock',
    outofstock: 'Out of Stock',
    onbackorder: 'On Backorder',
  };
  return labels[status] || 'Unknown';
}

// WhatsApp ordering (store owner takes all orders via WhatsApp, no on-site payment)
export const WHATSAPP_NUMBER = '971528107166';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// WhatsApp link for ordering a whole cart
export function getCartWhatsAppUrl(items: CartItem[], language: 'en' | 'ar' = 'en'): string {
  const L = language === 'ar' ? {
    intro: "مرحباً، أود طلب:",
    total: "الإجمالي:",
    tax: "+ ضريبة",
  } : {
    intro: "Hello, I'd like to place an order:",
    total: "Total:",
    tax: "+ Tax",
  };

  const lines = items.map((item) => {
    const displayName = language === 'ar' && item.arabicName ? item.arabicName : item.name;
    const label = item.bundleLabel ? ` (${item.bundleLabel})` : '';
    const qtyStr = item.quantity > 1 ? `${item.quantity} × ` : '';
    return `• ${qtyStr}${displayName}${label} — ${formatPrice(parseFloat(item.price) * item.quantity)} ${L.tax}`;
  });
  const total = formatPrice(calculateCartTotal(items));
  const message = `${L.intro}\n\n${lines.join('\n')}\n\n${L.total} ${total} ${L.tax}`;
  return buildWhatsAppUrl(message);
}

// Get stock status color
export function getStockStatusColor(status: string): string {
  const colors: { [key: string]: string } = {
    instock: 'text-green-600',
    outofstock: 'text-red-600',
    onbackorder: 'text-yellow-600',
  };
  return colors[status] || 'text-gray-600';
}

// Decode HTML entities
export function decodeHtmlEntities(str: string): string {
  if (!str) return str;
  return str.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  }).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#038;/g, '&');
}
