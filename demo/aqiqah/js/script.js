// ================= NUR BAROKAH AQIQAH — script.js =================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header solid on scroll ---- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  /* ---- Mobile nav ---- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-close');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => mobileNav.classList.add('open'));
    mobileClose && mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  /* ---- FAQ accordion: hanya satu terbuka ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const alreadyOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!alreadyOpen) item.classList.add('open');
    });
  });

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });
  reveals.forEach(el => io.observe(el));

  /* ---- Kirim pesan kontak ke WhatsApp ---- */
  const BUSINESS_NAME = 'Nur Barokah Aqiqah';
  const WA_NUMBER = '6281234567890'; // ganti dengan nomor WhatsApp bisnis asli

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = contactForm.nama.value.trim();
      const telepon = contactForm.telepon.value.trim();
      const paket = contactForm.paket ? contactForm.paket.value : '';
      const tanggal = contactForm.tanggal ? contactForm.tanggal.value : '';
      const pesan = contactForm.pesan.value.trim();

      let text = `Halo ${BUSINESS_NAME}, saya ${nama || '(nama belum diisi)'}`;
      if (paket) text += `, saya tertarik dengan ${paket}`;
      if (tanggal) text += ` untuk tanggal ${tanggal}`;
      text += `. `;
      if (pesan) text += pesan;
      text += `\n\nNomor telepon saya: ${telepon || '-'}`;

      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  /* ---- Quick order buttons (paket) -> kirim WA dengan nama paket ---- */
  document.querySelectorAll('[data-wa-package]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pkg = btn.getAttribute('data-wa-package');
      const text = `Halo ${BUSINESS_NAME}, saya ingin bertanya dan memesan ${pkg}. Mohon informasi lebih lanjut. Terima kasih.`;
      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  });

  /* ---- Fallback gambar rusak ---- */
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', function handler(){
      this.removeEventListener('error', handler);
      this.src = this.getAttribute('data-fallback');
    });
  });

  /* ---- Tahun otomatis di footer ---- */
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
});
