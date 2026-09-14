// ===== GARDA BANGUN — shared behaviour =====

// Header: transparent -> solid on scroll
const header = document.querySelector('.site-header');
function handleScroll(){
  if(!header) return;
  if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
  else{ header.classList.remove('is-scrolled'); }
}
handleScroll();
window.addEventListener('scroll', handleScroll, { passive:true });

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if(menuToggle && navLinks){
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const expanded = navLinks.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// FAQ accordion — one open at a time
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if(!wasOpen){ item.classList.add('open'); }
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold:.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Contact form -> WhatsApp (label tombol tetap "Kirim via WhatsApp")
const WA_NUMBER = '6281227008899'; // nomor WhatsApp bisnis (ganti sesuai nomor asli)
const BRAND_NAME = 'Garda Bangun';

const contactForm = document.querySelector('#contactForm');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const nama = contactForm.querySelector('#nama')?.value.trim() || '-';
    const telp = contactForm.querySelector('#telepon')?.value.trim() || '-';
    const layanan = contactForm.querySelector('#layanan')?.value || '-';
    const pesan = contactForm.querySelector('#pesan')?.value.trim() || '-';

    const text =
`Halo ${BRAND_NAME}, saya ${nama}.
Saya ingin bertanya/berkonsultasi mengenai layanan: ${layanan}.
Nomor WhatsApp saya: ${telp}.
Detail kebutuhan: ${pesan}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

// Mini hero/quick contact form (kalau ada di halaman lain)
document.querySelectorAll('.quick-wa-form').forEach(form => {
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const nama = form.querySelector('input[name="nama"]')?.value.trim() || '-';
    const kebutuhan = form.querySelector('input[name="kebutuhan"], select[name="kebutuhan"]')?.value || '-';
    const text = `Halo ${BRAND_NAME}, saya ${nama}. Saya tertarik dengan layanan: ${kebutuhan}. Mohon info lebih lanjut.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  });
});
