const fs=require('fs');
const files=['store/slices/dashboardSlice.ts','store/slices/earningsSlice.ts','store/slices/inventorySlice.ts','store/slices/chatSlice.ts','src/app/providers.tsx'];
for(const file of files) {
  if(fs.existsSync(file)) {
    let c = fs.readFileSync(file, 'utf8');
    c = c.replace(/@\/src\//g, '@/');
    c = c.replace(/from ['"]chat\.json['"]/, "from '@/dummy/chat'");
    fs.writeFileSync(file, c, 'utf8');
    console.log('Fixed', file);
  }
}
