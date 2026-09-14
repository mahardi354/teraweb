// ============ CONFIG ============
const BRAND_NAME = "Kilat Listrik";
const WA_NUMBER = "6281234567890"; // TODO: ganti dengan nomor WhatsApp bisnis Anda

// ============ HEADER SCROLL STATE ============
const header = document.querySelector('.site-header');
function handleScroll(){
  if(!header) return;
  if(window.scrollY > 40){ header.classList.add('scrolled'); }
  else{ header.classList.remove('scrolled'); }
}
window.addEventListener('scroll', handleScroll, { passive:true });
handleScroll();

// ============ MOBILE MENU ============
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuClose = document.querySelector('.menu-close');
if(navToggle && mobileMenu){
  navToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
}
if(menuClose && mobileMenu){
  menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}
document.querySelectorAll('.mobile-menu a').forEach(a=>{
  a.addEventListener('click', ()=> mobileMenu && mobileMenu.classList.remove('open'));
});

// ============ FAQ ACCORDION (satu terbuka bergantian) ============
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i=> i.classList.remove('open'));
    if(!isOpen){ item.classList.add('open'); }
  });
});

// ============ REVEAL ON SCROLL ============
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && revealEls.length){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
  revealEls.forEach(el=> io.observe(el));
} else {
  revealEls.forEach(el=> el.classList.add('in'));
}

// ============ COUNTER ANIMATION ============
const counters = document.querySelectorAll('[data-count]');
function animateCounter(el){
  const target = parseFloat(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const dur = 1400;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now-start)/dur, 1);
    const eased = 1 - Math.pow(1-p, 3);
    const val = target * eased;
    el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if('IntersectionObserver' in window && counters.length){
  const ioC = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ animateCounter(e.target); ioC.unobserve(e.target); }
    });
  }, { threshold:0.5 });
  counters.forEach(c=> ioC.observe(c));
}

// ============ CONTACT FORM -> WHATSAPP ============
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const nama = document.getElementById('cf-nama').value.trim();
    const hp = document.getElementById('cf-hp').value.trim();
    const layanan = document.getElementById('cf-layanan').value;
    const alamat = document.getElementById('cf-alamat').value.trim();
    const pesan = document.getElementById('cf-pesan').value.trim();

    let text = `Halo ${BRAND_NAME}, saya ${nama || '(nama)'}.`;
    text += `\nSaya ingin bertanya / memesan layanan: ${layanan || '(belum dipilih)'}.`;
    if(alamat){ text += `\nLokasi/alamat: ${alamat}.`; }
    if(pesan){ text += `\nDetail keluhan: ${pesan}`; }
    if(hp){ text += `\nNo HP saya: ${hp}`; }
    text += `\n\nMohon info lebih lanjut, terima kasih.`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

// ============ GENERIC WA QUICK LINKS (data-wa-msg buttons) ============
document.querySelectorAll('[data-wa-msg]').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const msg = btn.getAttribute('data-wa-msg') || `Halo ${BRAND_NAME}, saya ingin bertanya seputar layanan listrik.`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });
});
