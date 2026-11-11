const WA="6281234567890",BN="Yayasan Jabar Agung (Rumah Duka Jelambar)";
const hd=document.getElementById('hd');const sc=()=>hd.classList.toggle('solid',scrollY>40);addEventListener('scroll',sc);sc();
document.getElementById('bg').onclick=()=>document.getElementById('nv').classList.toggle('open');
document.addEventListener('click',e=>{const b=e.target.closest('.q button');if(!b)return;const q=b.parentElement,o=q.classList.contains('open');document.querySelectorAll('.q.open').forEach(x=>{x.classList.remove('open');x.querySelector('.a').style.maxHeight=0});if(!o){q.classList.add('open');const a=q.querySelector('.a');a.style.maxHeight=a.scrollHeight+'px'}});
const f=document.getElementById('f');if(f)f.onsubmit=e=>{e.preventDefault();const v=id=>document.getElementById(id).value.trim();const t='Halo '+BN+', saya '+v('n')+'.\nNomor telepon: '+v('t')+'\nKebutuhan: '+v('k')+'\nPesan: '+(v('m')||'-');window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(t),'_blank')};
