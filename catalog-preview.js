'use strict';
// Static demo only. No merchant links, tracking, checkout or personal data collection.
const concepts=Object.freeze([
 {id:'pillow',name:'Ergonomic comfort pillow',category:'Home',symbol:'☁',description:'A concept for a home comfort recommendation. Specifications and claims are not verified.'},
 {id:'trimmer',name:'Compact grooming tool',category:'Personal care',symbol:'✦',description:'A concept for an everyday grooming recommendation. Specifications and claims are not verified.'},
 {id:'bottle',name:'Portable hydration bottle',category:'Wellness',symbol:'◉',description:'A concept for a hydration accessory recommendation. Specifications and claims are not verified.'}
]);
const cards=document.querySelector('#cards'),category=document.querySelector('#category'),empty=document.querySelector('#empty');
function render(){
 const items=concepts.filter(item=>category.value==='all'||item.category===category.value);
 cards.replaceChildren();
 for(const item of items){
  const card=document.createElement('article');card.className='card';
  const art=document.createElement('div');art.className='art';art.setAttribute('aria-hidden','true');art.textContent=item.symbol;
  const body=document.createElement('div');body.className='card-body';
  const type=document.createElement('span');type.className='pill';type.textContent=item.category;
  const title=document.createElement('h3');title.textContent=item.name;
  const description=document.createElement('p');description.textContent=item.description;
  const status=document.createElement('span');status.className='disabled';status.textContent='Preview only · Not for sale';
  body.append(type,title,description,status);card.append(art,body);cards.append(card);
 }
 empty.hidden=items.length!==0;
}
category.addEventListener('change',render);render();
