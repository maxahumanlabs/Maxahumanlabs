const fs = require('fs');

const peptiveTimerPath = '/Users/Seif/Documents/Maxa Human/peptive-master/components/cart/CartTimer.tsx';
const maxaTimerPath = '/Users/Seif/Documents/Maxa Human/Maxa Human/components/cart/CartTimer.tsx';

// 1. Move CartTimer to Maxa Human
if (fs.existsSync(peptiveTimerPath)) {
  const timerContent = fs.readFileSync(peptiveTimerPath, 'utf8');
  fs.writeFileSync(maxaTimerPath, timerContent);
  fs.unlinkSync(peptiveTimerPath);
  console.log('Moved CartTimer.tsx to Maxa Human');
}

// 2. Undo changes in peptive-master CartSidebar
const peptiveSidebarPath = '/Users/Seif/Documents/Maxa Human/peptive-master/components/cart/CartSidebar.tsx';
if (fs.existsSync(peptiveSidebarPath)) {
  let content = fs.readFileSync(peptiveSidebarPath, 'utf8');
  content = content.replace("import CartTimer from './CartTimer';\n", "");
  content = content.replace("              <CartTimer />\n", "");
  fs.writeFileSync(peptiveSidebarPath, content);
  console.log('Reverted CartSidebar.tsx in peptive-master');
}

// 3. Apply changes to Maxa Human CartSidebar
const maxaSidebarPath = '/Users/Seif/Documents/Maxa Human/Maxa Human/components/cart/CartSidebar.tsx';
if (fs.existsSync(maxaSidebarPath)) {
  let content = fs.readFileSync(maxaSidebarPath, 'utf8');
  if (!content.includes('CartTimer')) {
    content = content.replace(
      "import CartItem from './CartItem';\nimport CartRecommendations from './CartRecommendations';",
      "import CartItem from './CartItem';\nimport CartRecommendations from './CartRecommendations';\nimport CartTimer from './CartTimer';"
    );
    
    // Sometimes it might just be next to CartItem
    if (!content.includes('import CartTimer')) {
      content = content.replace(
        "import CartItem from './CartItem';",
        "import CartItem from './CartItem';\nimport CartTimer from './CartTimer';"
      );
    }
    
    // Insert <CartTimer /> before <CartRecommendations
    content = content.replace(
      "              <CartRecommendations",
      "              <CartTimer />\n              <CartRecommendations"
    );
    
    fs.writeFileSync(maxaSidebarPath, content);
    console.log('Updated CartSidebar.tsx in Maxa Human');
  } else {
    console.log('CartTimer already in Maxa Human CartSidebar.tsx');
  }
}
