const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
test('affiliate offer data is valid and links are HTTPS and allowlisted',()=>{
 const offers=JSON.parse(read('affiliate-offers.json'));assert.ok(Array.isArray(offers)&&offers.length>0);
 const ids=new Set();
 for(const offer of offers){
  assert.ok(offer.id&&offer.name&&offer.description&&offer.category);
  assert.ok(!ids.has(offer.id));ids.add(offer.id);
  assert.ok(offer.links&&offer.links.default);
  for(const value of Object.values(offer.links)){
   const url=new URL(value);assert.equal(url.protocol,'https:');assert.equal(url.hostname,'mailtrkhub.com');
   assert.equal(url.searchParams.get('a'),'302684');assert.match(url.searchParams.get('c'),/^\d+$/);
  }
 }
});
test('catalog has visible affiliate disclosure and stays noindex',()=>{
 const html=read('catalog-preview.html');
 assert.match(html,/name="robots" content="noindex,nofollow"/);
 assert.match(html,/Affiliate disclosure/);
 assert.match(html,/not the official website/);
 assert.match(html,/id="language"/);
 assert.match(html,/id="category"/);
});
test('affiliate anchors include sponsored and security rel values',()=>{
 const js=read('catalog-preview.js');
 assert.match(js,/sponsored nofollow noopener noreferrer/);
 assert.match(js,/textContent=item\.name/);
 assert.doesNotMatch(js,/innerHTML\s*=/);
});
test('production homepage, robots and product list remain in safe initial state',()=>{
 assert.match(read('robots.txt'),/Disallow: \/$/m);
 assert.deepEqual(JSON.parse(read('products.json')),[]);
 assert.match(read('index.html'),/Affiliate disclosure/);\n assert.match(read('pets.html'),/Fraponova Pets/);
});
