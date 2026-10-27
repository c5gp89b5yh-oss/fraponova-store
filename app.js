const animals=[
{name:"Cats",nameOne:"Curious Cat",category:"Pets",image:"photo-1573865526739-10659fec78a5",description:"Tiny paws, big personality",pos:"50%"},
{name:"Dogs",nameOne:"Best-Friend Dog",category:"Pets",image:"photo-1552053831-71594a27632d",description:"Loyal hearts and wagging tails",pos:"50%"},
{name:"Elephants",nameOne:"Gentle Elephant",category:"Wildlife",image:"photo-1564760055775-d63b17a55c44",description:"The gentle giants of the wild",pos:"50%"},
{name:"Horses",nameOne:"Free-Spirited Horse",category:"Wildlife",image:"photo-1534307671554-38a9b6d9f1bb",description:"Beauty, strength and freedom",pos:"50%"},
{name:"Birds",nameOne:"Beautiful Bird",category:"Birds",image:"photo-1452570053594-1b985d6ea890",description:"A colorful world of wings",pos:"50%"},
{name:"Rabbits",nameOne:"Sweet Rabbit",category:"Pets",image:"photo-1585110396000-c9ffd4e4b308",description:"Fluffy little bundles of joy",pos:"50%"},
{name:"Wild Cats",nameOne:"Wild Cat",category:"Wildlife",image:"photo-1561731216-c3a4d99437d5",description:"Wild beauty, wild respect",pos:"50%"},
{name:"Puppies",nameOne:"Happy Puppy",category:"Pets",image:"photo-1517849845537-4d257902454a",description:"Little paws and endless wonder",pos:"50%"},
{name:"Parrots",nameOne:"Bright Parrot",category:"Birds",image:"photo-1549608276-5786777e6587",description:"Personality in full color",pos:"50%"},
{name:"Kittens",nameOne:"Playful Kitten",category:"Pets",image:"photo-1514888286974-6c03e2ca1dba",description:"Cuddles, naps and curiosity",pos:"50%"},
{name:"Safari",nameOne:"Safari Beauty",category:"Wildlife",image:"photo-1549366021-9f761d450615",description:"The magic of the open plains",pos:"50%"},
{name:"Companions",nameOne:"Forever Friend",category:"Pets",image:"photo-1587300003388-59208cc962cb",description:"Little friends, lifelong love",pos:"50%"}
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const imageUrl=(id,w=700)=>'https://images.unsplash.com/'+encodeURIComponent(id)+'?auto=format&fit=crop&w='+w+'&q=80';
const categoryGrid=document.getElementById('category-grid');
for(const a of animals.slice(0,6)){
 const b=document.createElement('button');b.type='button';b.className='category-card';b.setAttribute('aria-label','Explore '+a.name);
 b.innerHTML='<img loading="lazy" src="'+imageUrl(a.image,550)+'" alt="'+esc(a.name)+'" onerror="this.onerror=null;this.src=\x27https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=550&q=80\x27"><span class="category-count">✳</span><span class="category-label">'+esc(a.name)+'</span>';
 b.addEventListener('click',()=>{filter='All';document.getElementById('gallery-search').value=a.name==='Puppies'?'dog':a.name==='Kittens'?'cat':a.name==='Parrots'?'bird':a.name==='Companions'?'dog':a.name.toLowerCase().replace(/s$/,'');search=document.getElementById('gallery-search').value.toLowerCase();setActiveFilter();renderGallery();document.getElementById('animals').scrollIntoView({behavior:'smooth'})});
 categoryGrid.append(b);
}
let filter='All',search='';
const hearts=new Set();
function setActiveFilter(){document.querySelectorAll('[data-filter]').forEach(b=>{let on=b.dataset.filter===filter;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on))})}
function renderGallery(){
 const gallery=document.getElementById('gallery');gallery.replaceChildren();
 const matches=animals.filter(a=>(filter==='All'||a.category===filter)&&[a.name,a.nameOne,a.description].join(' ').toLowerCase().includes(search));
 document.getElementById('empty-gallery').hidden=matches.length!==0;
 for(const a of matches){
  const card=document.createElement('article');card.className='animal-card';
  const saved=hearts.has(a.name);
  card.innerHTML='<div class="animal-cover"><img loading="lazy" alt="'+esc(a.nameOne)+'" src="'+imageUrl(a.image)+'" style="object-position:'+a.pos+'" onerror="this.onerror=null;this.src=\x27https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=700&q=80\x27"><button type="button" class="like-button" aria-pressed="'+String(saved)+'" aria-label="'+(saved?'Remove from':'Add to')+' favorites: '+esc(a.name)+'"><svg class="icon"><use href="#i-heart"></use></svg></button></div><div class="animal-details"><div><h3>'+esc(a.name)+'</h3><p>'+esc(a.description)+'</p></div><span class="tiny-circle"><svg class="icon"><use href="#i-arrow"></use></svg></span></div>';
  card.querySelector('button').addEventListener('click',e=>{const b=e.currentTarget;if(hearts.has(a.name))hearts.delete(a.name);else hearts.add(a.name);let selected=hearts.has(a.name);b.setAttribute('aria-pressed',String(selected));b.setAttribute('aria-label',(selected?'Remove from':'Add to')+' favorites: '+a.name)});
  gallery.append(card);
 }
}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;setActiveFilter();renderGallery()}));
document.getElementById('gallery-search').addEventListener('input',e=>{search=e.target.value.trim().toLowerCase();renderGallery()});
const menu=document.getElementById('mobile-menu'),toggle=document.getElementById('menu-toggle');
toggle.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu')});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.hidden=true;toggle.setAttribute('aria-expanded','false')}));
const stories={
cat:{title:'Small rituals, happy cats.',kicker:'CAT LIFE / EVERYDAY CARE',paras:['Cats thrive when they have a sense of safety, a choice of cozy hiding places, and opportunities to play. Even simple cardboard boxes, window views and scratching posts can make a difference.','Offer interactive play in short sessions and let your cat initiate affection on their own terms. Keep fresh water available, make litter trays easy to access, and ask a veterinarian if you notice changes in appetite or behavior.','The best routine is the one that respects your cat’s unique personality.']},
dog:{title:'Adventure starts outside.',kicker:'DOG LIFE / ENRICHMENT',paras:['For a dog, a walk is a whole world of scents, sounds and discovery. Give them time to sniff instead of treating every walk like a race to the finish.','Choose routes, weather and walking lengths that suit your dog’s age, health and energy level. Bring water when needed, use a comfortable lead, and reward relaxed curiosity.','Those small daily adventures are a beautiful way to build trust together.']},
wild:{title:'Make room for the wild.',kicker:'WILDLIFE / RESPECT',paras:['Elephants, big cats and wild birds all play vital roles in their natural ecosystems. Admiring them begins with understanding that they need room, safety and healthy habitats.','Support reputable conservation efforts, observe wildlife from a respectful distance and avoid venues that encourage unsafe handling or exploitation.','The most meaningful way to love wild animals is to help them stay wild.']}
};
const dlg=document.getElementById('content-dialog');
function openDialog(title,kicker,paras){document.getElementById('dialog-title').textContent=title;document.getElementById('dialog-kicker').textContent=kicker;const content=document.getElementById('dialog-copy');content.replaceChildren();paras.forEach(p=>{const node=document.createElement('p');node.textContent=p;content.append(node)});dlg.showModal()}
document.querySelectorAll('[data-article]').forEach(button=>button.addEventListener('click',()=>{let a=stories[button.dataset.article];openDialog(a.title,a.kicker,a.paras)}));
document.getElementById('open-privacy').addEventListener('click',()=>openDialog('Privacy & disclosure','FRAPONOVA PETS',['This website provides informational content, photography and general pet inspiration. It does not currently collect account registrations or process any payments.','Photographs displayed here are loaded from Unsplash. Third-party image providers and external destinations may process network requests according to their own privacy practices.','We may introduce carefully selected affiliate links in the future. If we do, qualifying purchases may earn us a commission at no extra cost to you. Purchases, shipping and returns take place with the retailer.','For privacy inquiries or any other question, contact support@fraponova.com.']));
document.getElementById('year').textContent=String(new Date().getFullYear());
renderGallery();
