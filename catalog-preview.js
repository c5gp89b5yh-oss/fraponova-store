'use strict';
const cards=document.querySelector('#cards'),category=document.querySelector('#category'),empty=document.querySelector('#empty');
const language=document.querySelector('#language'),message=document.querySelector('#catalog-message');
const supportedLanguages=new Set(['en','de','fr','es','no','nl','it','he','sv','fi','pl','cs','da','ro']);
const safeTrackingUrl=value=>{try{const u=new URL(value);return u.protocol==='https:'&&u.hostname==='mailtrkhub.com'&&u.searchParams.get('a')==='302684'&&/^\d+$/.test(u.searchParams.get('c')||'')?u.href:null}catch{return null}};
async function init(){
 try{
  const response=await fetch('/affiliate-offers.json',{cache:'no-store'});
  if(!response.ok)throw new Error('Offer data unavailable');
  const offers=await response.json();
  if(!Array.isArray(offers))throw new Error('Invalid offer data');
  const render=()=>{
   cards.replaceChildren();
   const items=offers.filter(item=>category.value==='all'||item.category===category.value);
   empty.hidden=items.length!==0;
   for(const item of items){
    const card=document.createElement('article');card.className='card';
    const art=document.createElement('div');art.className='art';art.setAttribute('aria-hidden','true');art.classList.add('offer-art-surface');
    const body=document.createElement('div');body.className='card-body';
    const type=document.createElement('span');type.className='pill';type.textContent=item.category;
    const title=document.createElement('h3');title.textContent=item.name;
    const description=document.createElement('p');description.textContent=item.description;
    const locale=supportedLanguages.has(language.value)?language.value:'en';
    const url=safeTrackingUrl(item.links?.[locale]||item.links?.default);
    const action=document.createElement(url?'a':'span');action.className=url?'offer-link':'disabled';
    action.textContent=url?'Consulter l’offre':'Offre indisponible';
    if(url){action.href=url;action.target='_blank';action.rel='sponsored nofollow noopener noreferrer';action.setAttribute('aria-label','View advertiser offer for '+item.name+' (opens new tab)')}
    body.append(type,title,description,action);card.append(art,body);cards.append(card);
   }
  };
  category.addEventListener('change',render);language.addEventListener('change',render);render();
  message.textContent='Liens affiliés vers des annonceurs indépendants. Vérifiez les conditions et la disponibilité avant tout achat.';
 }catch{message.textContent='Les offres sont temporairement indisponibles. Veuillez réessayer plus tard.';cards.replaceChildren()}
}
init();
