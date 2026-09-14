// ===== Config =====
const BRAND_NAME = "Jejak Nusantara";
const WA_NUMBER = "6281234567890"; // ganti dengan nomor WhatsApp bisnis asli

// ===== Header scroll state =====
const header = document.querySelector('.site-header');
function handleScroll(){
  if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
  else{ header.classList.remove('is-scrolled'); }
}
window.addEventListener('scroll', handleScroll);
handleScroll();

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if(navToggle){
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
  });
  mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.textContent = '☰';
  }));
}

// ===== FAQ accordion (alternating: only one open at a time) =====
document.querySelectorAll('.faq-list').forEach(list => {
  const items = list.querySelectorAll('.faq-item');
  items.forEach(item => {
    const q = item.querySelector('.faq-question');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if(!isOpen){ item.classList.add('open'); }
    });
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ===== Package filter tabs =====
const tabs = document.querySelectorAll('.filter-tab');
const groups = document.querySelectorAll('.package-group');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.target;
    groups.forEach(g => {
      g.classList.toggle('active', target === 'all' || g.dataset.group === target);
    });
  });
});

// ===== Contact form -> WhatsApp =====
const waForm = document.getElementById('waForm');
if(waForm){
  waForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = waForm.nama.value.trim();
    const paket = waForm.paket ? waForm.paket.value : '';
    const tanggal = waForm.tanggal ? waForm.tanggal.value : '';
    const jumlah = waForm.jumlah ? waForm.jumlah.value : '';
    const pesan = waForm.pesan ? waForm.pesan.value.trim() : '';

    let text = `Halo ${BRAND_NAME}, saya ${nama}`;
    if(paket) text += `, ingin bertanya/booking untuk paket "${paket}"`;
    if(tanggal) text += ` pada tanggal ${tanggal}`;
    if(jumlah) text += ` untuk ${jumlah} orang`;
    text += `.`;
    if(pesan) text += ` ${pesan}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

// Quick WA button on package cards
document.querySelectorAll('[data-wa-package]').forEach(btn => {
  btn.addEventListener('click', () => {
    const pkg = btn.getAttribute('data-wa-package');
    const text = `Halo ${BRAND_NAME}, saya ingin bertanya/booking untuk paket "${pkg}". Mohon info lebih lanjut ya, terima kasih.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  });
});
