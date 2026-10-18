(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],h=$('header');
const sc=()=>h.classList.toggle('s',scrollY>50||h.dataset.solid);sc();addEventListener('scroll',sc,{passive:true});
const m=$('.mn');$('.burger').onclick=()=>m.classList.add('o');$$('.mn a,.mn button').forEach(a=>a.onclick=()=>m.classList.remove('o'));
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});$$('.rv').forEach(e=>io.observe(e));
$$('.fl button').forEach(b=>b.onclick=()=>{$$('.fl button').forEach(x=>x.classList.remove('on'));b.classList.add('on');$$('.gi').forEach(g=>g.classList.toggle('h',b.dataset.f!='all'&&g.dataset.c!=b.dataset.f))});
const lb=$('.lb');if(lb){$$('.gi').forEach(g=>g.onclick=()=>{lb.querySelector('img').src=g.dataset.full;lb.classList.add('o')});lb.onclick=()=>lb.classList.remove('o');addEventListener('keydown',e=>e.key=='Escape'&&lb.classList.remove('o'))}
const f=$('form');if(f)f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));
const t=`Halo ${f.dataset.n}, saya ${d.nama}${d.pasangan?' & '+d.pasangan:''}.\nTanggal acara: ${d.tanggal||'belum pasti'}\nLayanan: ${d.layanan}\nEmail: ${d.email}\n\n${d.pesan||''}`;
open(`https://wa.me/${f.dataset.wa}?text=${encodeURIComponent(t)}`,'_blank')};$$('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('details').forEach(o=>{if(o!==d)o.open=false})}))})();
