const WA="6281234567890",BN="Yayasan Jabar Agung (Rumah Duka Jelambar)";
const hd=document.getElementById('hd');const sc=()=>hd.classList.toggle('solid',scrollY>40);addEventListener('scroll',sc);sc();
document.getElementById('bg').onclick=()=>{document.getElementById('nv').classList.toggle('open');hd.classList.toggle('menu')};
document.addEventListener('click',e=>{const b=e.target.closest('.q button');if(!b)return;const q=b.parentElement,o=q.classList.contains('open');document.querySelectorAll('.q.open').forEach(x=>{x.classList.remove('open');x.querySelector('.a').style.maxHeight=0});if(!o){q.classList.add('open');const a=q.querySelector('.a');a.style.maxHeight=a.scrollHeight+'px'}});
const f=document.getElementById('f');if(f)f.onsubmit=e=>{e.preventDefault();const v=id=>document.getElementById(id).value.trim();const t='Halo '+BN+', saya '+v('n')+'.\nNomor telepon: '+v('t')+'\nKebutuhan: '+v('k')+'\nPesan: '+(v('m')||'-');window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(t),'_blank')};
const sl=[...document.querySelectorAll('.slide')],dt=[...document.querySelectorAll('.dots b')];
if(sl.length){let i=0,tm;const show=n=>{sl[i].classList.remove('on');dt[i].classList.remove('on');i=(n+sl.length)%sl.length;sl[i].classList.add('on');dt[i].classList.add('on')};
const auto=()=>{clearInterval(tm);tm=setInterval(()=>show(i+1),6500)};auto();
document.querySelector('.arr.l').onclick=()=>{show(i-1);auto()};document.querySelector('.arr.r').onclick=()=>{show(i+1);auto()};dt.forEach((d,k)=>d.onclick=()=>{show(k);auto()})}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
