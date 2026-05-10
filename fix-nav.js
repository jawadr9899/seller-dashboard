const fs = require('fs');
const files = [
  'src/app/settings/page.tsx',
  'src/page-components/Chat.tsx',
  'src/page-components/Dashboard.tsx',
  'src/page-components/Earnings.tsx',
  'src/page-components/Inventory.tsx',
  'src/page-components/Stores.tsx'
];

for(const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/const navigationItems = \[[\s\S]*?\];/g, '');
  content = content.replace(/const bottomTabs = \[[\s\S]*?\];/g, '');
  if (!content.includes('import { navigationItems, bottomTabs }')) {
    content = content.replace(/(import .*;\n)+/, "$&\nimport { navigationItems, bottomTabs } from '@/config/navigation';\n");
  }
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed', file);
}
