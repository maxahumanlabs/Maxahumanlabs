const fs = require('fs');

let file = 'components/products/BuildYourStack.tsx';
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');

  // Add import if missing
  if (!content.includes('decodeHtmlEntities')) {
    content = content.replace("import { useLanguage } from '@/contexts/LanguageContext';", "import { useLanguage } from '@/contexts/LanguageContext';\nimport { decodeHtmlEntities } from '@/lib/utils';");
    
    // Replace in Grid Card
    const oldName1 = "{language === 'ar' && (product as any).arabic_name ? (product as any).arabic_name : product.name}";
    const newName1 = "{decodeHtmlEntities(language === 'ar' && (product as any).arabic_name ? (product as any).arabic_name : product.name)}";
    content = content.replace(oldName1, newName1);

    // Replace in Stack Items List
    const oldName2 = "{item.name}";
    const newName2 = "{decodeHtmlEntities(language === 'ar' && (item as any).arabic_name ? (item as any).arabic_name : item.name)}";
    // Carefully only replace the one inside <p className="...">{item.name}</p>
    content = content.replace(/>{item.name}</g, `>${newName2}<`);
    
    // Replace in alt tags
    content = content.replace(/alt={product\.name}/g, 'alt={decodeHtmlEntities(product.name)}');
    content = content.replace(/alt={item\.name}/g, 'alt={decodeHtmlEntities(item.name)}');

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`${file} already has decodeHtmlEntities`);
  }
} else {
  console.log(`${file} not found`);
}
