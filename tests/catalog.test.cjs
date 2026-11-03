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
 assert.match(read('robots.txt'),/Allow: \/$/m);assert.match(read('robots.txt'),/Sitemap: https:\/\/fraponova.com\/sitemap\.xml/);
 assert.deepEqual(JSON.parse(read('products.json')),[]);
 assert.match(read('index.html'),/Le futur a/);assert.match(read('index.html'),/class="universe-grid"/);assert.match(read('index.html'),/brand-logo\.svg/);
 assert.match(read('index.html'),/id="collection"/);
 assert.match(read('produits.html'),/id="cards"/);
 assert.match(read('produits.html'),/catalog-preview\.js/);
 assert.match(read('pets.html'),/Fraponova Pets/);
});

test('SEO sitemap contains all real, canonical public pages',()=>{
 const pages=['index.html','categories.html','produits.html','smartphones.html','informatique.html','audio.html','maison.html','lifestyle.html','oreiller-ergonomique.html','a-propos.html','confidentialite.html'];
 const sitemap=read('sitemap.xml');
 for(const page of pages){const html=read(page);assert.match(html,/name="description"/);assert.match(html,/rel="canonical"/);assert.match(html,/lang="fr"/);assert.match(sitemap,new RegExp(page==='index.html'?'https:\\/\\/fraponova.com\\/<\\/loc>':page.replace('.','\\.')))}
 assert.match(read('catalog-preview.html'),/noindex,nofollow/);
});
test('category navigation uses real crawlable paths, no decorative icons',()=>{
 const home=read('index.html');for(const page of ['categories','produits','smartphones','informatique','audio','maison','lifestyle','a-propos'])assert.ok(home.includes('/'+page+'.html'));
 assert.doesNotMatch(home,/visual-label label-top|visual-ring ring-one|category-dock|signature-ticker/);
 assert.doesNotMatch(read('catalog-preview.js'),/item.symbol/);
});
