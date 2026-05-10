const fs = require('fs');
const files = ['src/page-components/Dashboard.tsx', 'src/page-components/Earnings.tsx', 'src/page-components/Inventory.tsx', 'src/page-components/Stores.tsx'];

for(const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/icon="[^"]+"/g, ''); // Remove emojis from icons
  fs.writeFileSync(f, c, 'utf8');
}
