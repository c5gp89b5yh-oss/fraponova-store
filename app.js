/* Add products to products.json ONLY after affiliate approval and image usage authorization. */
const holder = document.querySelector('#products');
const empty = document.querySelector('#empty');
const search = document.querySelector('#search');
const select = document.querySelector('#category-select');
let products = [];
function safeUrl(raw) {
  try { const u = new URL(raw); return u.protocol === 'https:' ? u.href : null; }
  catch { return null; }
}
function render(){
  const q = search.value.trim().toLowerCase(), cat = select.value;
  const matches = products.filter(x=>(cat==='all'||x.category===cat) && [x.name,x.brand,x.description].join(' ').toLowerCase().includes(q));
  holder.replaceChildren(); empty.hidden = matches.length > 0;
  for (const item of matches){
    const affiliate = safeUrl(item.affiliateUrl);
    if (!affiliate || !item.imageUrl || !safeUrl(item.imageUrl)) continue;
    const card=document.createElement('article'); card.className='product';
    const img=document.createElement('img'); img.src=item.imageUrl; img.alt=item.name; img.loading='lazy';
    const merchant=document.createElement('p'); merchant.className='merchant'; merchant.textContent=`${item.brand} · Sold by ${item.retailer}`;
    const name=document.createElement('h3'); name.textContent=item.name;
    const desc=document.createElement('p'); desc.textContent=item.description;
    const link=document.createElement('a'); link.href=affiliate; link.target='_blank'; link.rel='sponsored nofollow noopener noreferrer'; link.textContent='View at retailer ↗';
    card.append(img,merchant,name,desc,link); holder.append(card);
  }
  empty.hidden=holder.children.length>0;
}
search.addEventListener('input',render); select.addEventListener('change',render);
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{
  select.value=button.dataset.category; render(); document.querySelector('#discover').scrollIntoView({behavior:'smooth'});
}));
document.querySelector('#year').textContent=new Date().getFullYear();
fetch('/products.json',{cache:'no-store'}).then(r=>r.ok?r.json():[]).then(data=>{products=Array.isArray(data)?data:[];render()}).catch(render);
