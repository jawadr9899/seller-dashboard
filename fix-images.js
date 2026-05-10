const fs=require('fs'); 
['dummy/inventory.ts', 'dummy/stores.ts', 'dummy/chat.ts'].forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let n = 0;
  c = c.replace(/https:\/\/images\.unsplash\.com\/photo-[^?"']+(\?[^"']*)?/g, (match) => {
    n++;
    let w = match.includes('w=96') ? 96 : 400;
    return https://picsum.photos/seed///;
  });
  fs.writeFileSync(f, c);
});
console.log('Done');
