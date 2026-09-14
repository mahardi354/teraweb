// ===== Header scroll state =====
const header = document.querySelector('.site-header');
function onScroll(){
  if(window.scrollY > 40){ header.classList.add('scrolled'); }
  else{ header.classList.remove('scrolled'); }
}
window.addEventListener('scroll', onScroll);
onScroll();

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if(navToggle && mainNav){
  navToggle.addEventListener('click', ()=>{
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> mainNav.classList.remove('open'));
  });
}

// ===== FAQ accordion (one open at a time) =====
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i=> i.classList.remove('open'));
    if(!isOpen){ item.classList.add('open'); }
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el=> io.observe(el));
} else {
  revealEls.forEach(el=> el.classList.add('in'));
}

// ===== Contact form -> WhatsApp =====
const waForm = document.getElementById('wa-contact-form');
if(waForm){
  waForm.addEventListener('submit', function(e){
    e.preventDefault();
    const nama = document.getElementById('f-nama').value.trim();
    const anak = document.getElementById('f-anak').value.trim();
    const usia = document.getElementById('f-usia').value;
    const telp = document.getElementById('f-telp').value.trim();
    const program = document.getElementById('f-program').value;
    const pesan = document.getElementById('f-pesan').value.trim();

    const businessName = "Ceria Kids";
    const waNumber = "6281234567890"; // ganti dengan nomor WhatsApp resmi sekolah

    let text = `Halo ${businessName}, saya ${nama}`;
    if(anak){ text += ` ingin bertanya seputar pendaftaran untuk ananda ${anak}`; }
    if(usia){ text += ` (usia ${usia})`; }
    if(program){ text += `, untuk program ${program}`; }
    text += `.`;
    if(telp){ text += ` No. HP saya ${telp}.`; }
    if(pesan){ text += ` ${pesan}`; }

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

// ===== Image fallback (avoid dead links) =====
document.querySelectorAll('img[data-fallback-seed]').forEach(img=>{
  img.addEventListener('error', function(){
    const seed = this.getAttribute('data-fallback-seed');
    this.src = `https://picsum.photos/seed/${seed}/900/700`;
  }, {once:true});
});
