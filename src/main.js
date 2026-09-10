const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const cards=[...document.querySelectorAll('.project')];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>{const on=b===button;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  cards.forEach(c=>{c.hidden=button.dataset.filter!=='All'&&c.dataset.category!==button.dataset.filter;});
  document.querySelector('#empty').hidden=cards.some(c=>!c.hidden);
}));
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target);}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(e=>reveal.observe(e));
const cursor=document.querySelector('.cursor');
const petals=document.querySelector('.petals');
let x=innerWidth/2,y=innerHeight/2,raf=0;
if(matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(raf)return;raf=requestAnimationFrame(()=>{raf=0;if(cursor){cursor.style.transform=`translate3d(${x}px,${y}px,0)`;cursor.classList.add('visible');}if(petals&&!reduced.matches){petals.style.setProperty('--rx',`${(y/innerHeight-.5)*-12}deg`);petals.style.setProperty('--ry',`${(x/innerWidth-.5)*16}deg`);}});},{passive:true});
  document.addEventListener('pointerleave',()=>cursor?.classList.remove('visible'));
}
const sections=[...document.querySelectorAll('main>section[id]')];
const active=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('.dock a').forEach(a=>{const on=a.hash==='#'+e.target.id;a.classList.toggle('selected',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}),{rootMargin:'-15% 0px -55% 0px'});
sections.forEach(e=>active.observe(e));

// Keep both line boxes fixed while typing, and avoid repeated screen-reader announcements.
const titleLines=[...document.querySelectorAll('[data-title-line]')];
if(titleLines.length===2){
  const phrases=[['See','More'],['Scroll','Down']];
  let phrase=0,length=7,deleting=true,timer;
  const render=()=>{const [top,bottom]=phrases[phrase];titleLines[0].textContent=top.slice(0,length);titleLines[1].textContent=bottom.slice(0,Math.max(0,length-top.length));};
  const tick=()=>{
    if(reduced.matches||document.hidden)return;
    const total=phrases[phrase].join('').length;
    length+=deleting?-1:1;render();
    let delay=deleting?35:120;
    if(length===0){phrase=(phrase+1)%phrases.length;deleting=false;delay=200;}
    else if(length===total&&!deleting){deleting=true;delay=2100;}
    timer=setTimeout(tick,delay);
  };
  const restart=()=>{clearTimeout(timer);if(reduced.matches){phrase=0;length=7;deleting=true;render();}else if(!document.hidden)timer=setTimeout(tick,1800);};
  reduced.addEventListener('change',restart);
  document.addEventListener('visibilitychange',restart);
  restart();
}

const contactPanel=document.querySelector('.contact');
const contactTrigger=document.querySelector('.contact-trigger');
const contactLinks=document.querySelector('.contact-links');
if(contactPanel&&contactTrigger&&contactLinks){
  const setContactOpen=open=>{contactPanel.classList.toggle('is-open',open);contactTrigger.setAttribute('aria-expanded',String(open));contactLinks.inert=!open;};
  contactPanel.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')setContactOpen(true);});
  contactPanel.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&!contactLinks.contains(document.activeElement))setContactOpen(false);});
  contactTrigger.addEventListener('click',()=>setContactOpen(contactTrigger.getAttribute('aria-expanded')!=='true'));
  contactPanel.addEventListener('keydown',e=>{if(e.key==='Escape'){setContactOpen(false);contactTrigger.focus();}});
  contactPanel.addEventListener('focusout',e=>{if(!contactPanel.contains(e.relatedTarget))setContactOpen(false);});
  document.addEventListener('pointerdown',e=>{if(!contactPanel.contains(e.target))setContactOpen(false);});
}

const pageTransition=document.querySelector('.page-transition');
const transitionRoot=document.documentElement;
const transitionDuration=520;
const resetTransition=()=>{
  pageTransition?.classList.add('is-reset');
  transitionRoot.classList.remove('page-entering','page-entered','page-leaving');
  // Commit the off-screen reset while transitions are disabled, then re-arm it.
  void pageTransition?.offsetWidth;
  requestAnimationFrame(()=>pageTransition?.classList.remove('is-reset'));
};
if(pageTransition){
  if(transitionRoot.classList.contains('page-entering')){
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      transitionRoot.classList.remove('page-entering');
      transitionRoot.classList.add('page-entered');
      setTimeout(resetTransition,transitionDuration);
    }));
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest('a');
    if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target||link.hasAttribute('download'))return;
    const destination=new URL(link.href,location.href);
    const sameDocument=destination.pathname===location.pathname&&destination.search===location.search;
    if(destination.origin!==location.origin||!['http:','https:'].includes(destination.protocol)||sameDocument)return;
    event.preventDefault();
    if(reduced.matches){location.assign(destination.href);return;}
    transitionRoot.classList.add('page-leaving');
    let navigated=false;
    const navigate=()=>{if(navigated)return;navigated=true;try{sessionStorage.setItem('page-transition','1')}catch{}location.assign(destination.href);};
    const fallback=setTimeout(navigate,transitionDuration+80);
    pageTransition.addEventListener('transitionend',()=>{clearTimeout(fallback);navigate();},{once:true});
  });
  addEventListener('pageshow',event=>{if(event.persisted)resetTransition();});
}
