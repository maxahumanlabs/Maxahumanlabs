const fs = require('fs');
const path = require('path');

const srcPath = '/Users/Seif/Documents/Maxa Human/peptive-master/components/products/FloatingAddToCart.tsx';
const destPath = '/Users/Seif/Documents/Maxa Human/Maxa Human/components/products/FloatingAddToCart.tsx';

let content = fs.readFileSync(srcPath, 'utf8');

// Modify the scroll logic to use scrollY instead of "more-results" id
const oldScrollLogic = `      const recs = document.getElementById('more-results');
      const footer = document.querySelector('footer');
      if (!recs) {
        setVisible(false);
        return;
      }
      const vh = window.innerHeight;
      const recsTop = recs.getBoundingClientRect().top;
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
      // Visible once the recommendations section enters the viewport, hidden
      // once the footer is about to appear.
      setVisible(recsTop < vh && footerTop > vh * 0.9);`;

const newScrollLogic = `      const footer = document.querySelector('footer');
      const vh = window.innerHeight;
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
      
      // Show when scrolled down a bit (e.g., past the main product info)
      // Hide when footer is about to appear
      setVisible(window.scrollY > 600 && footerTop > vh * 0.9);`;

content = content.replace(oldScrollLogic, newScrollLogic);

// Write to Maxa Human
fs.writeFileSync(destPath, content);
console.log('Copied FloatingAddToCart.tsx');

// Now update ProductDetailClient.tsx
const detailPath = '/Users/Seif/Documents/Maxa Human/Maxa Human/components/products/ProductDetailClient.tsx';
let detailContent = fs.readFileSync(detailPath, 'utf8');

if (!detailContent.includes('FloatingAddToCart')) {
  detailContent = detailContent.replace(
    "import RelatedProducts from './RelatedProducts';", 
    "import RelatedProducts from './RelatedProducts';\nimport FloatingAddToCart from './FloatingAddToCart';"
  );
  
  detailContent = detailContent.replace(
    "      {/* Related Products Section */}", 
    "      <FloatingAddToCart product={product} />\n\n      {/* Related Products Section */}"
  );
  
  fs.writeFileSync(detailPath, detailContent);
  console.log('Updated ProductDetailClient.tsx');
}
