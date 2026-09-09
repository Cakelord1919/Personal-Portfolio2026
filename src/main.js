const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const cards=[...document.querySelectorAll('.project')];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>{const on=b===button;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  cards.forEach(c=>{c.hidden=button.dataset.filter!=='全部'&&c.dataset.category!==button.dataset.filter;});
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
