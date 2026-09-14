// ============================================================
// KANAYA CATERING — shared interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header: transparan -> solid saat scroll ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mainNav.classList.remove('open'));
    });
  }

  /* ---------- FAQ accordion (bergantian, hanya satu terbuka) ---------- */
  document.querySelectorAll('.faq-list').forEach(list => {
    const items = list.querySelectorAll('.faq-item');
    items.forEach(item => {
      const btn = item.querySelector('.faq-q');
      const answer = item.querySelector('.faq-a');
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(other => {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
    // buka item pertama secara default
    if (items[0]) {
      items[0].classList.add('open');
      const a = items[0].querySelector('.faq-a');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });

  /* ---------- Filter galeri ---------- */
  const filters = document.querySelectorAll('.gfilter');
  const gitems = document.querySelectorAll('.gitem');
  filters.forEach(f => {
    f.addEventListener('click', () => {
      filters.forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      const cat = f.dataset.filter;
      gitems.forEach(item => {
        if (cat === 'semua' || item.dataset.cat === cat) item.classList.remove('hide');
        else item.classList.add('hide');
      });
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Form kontak -> kirim ke WhatsApp ---------- */
  const waNumber = '6281234567890'; // ganti dengan nomor WhatsApp bisnis aktif
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = contactForm.nama.value.trim();
      const acara = contactForm.acara.value;
      const tanggal = contactForm.tanggal.value;
      const tamu = contactForm.tamu.value.trim();
      const pesan = contactForm.pesan.value.trim();

      let text = `Halo Kanaya Catering, saya ${nama || '-'}.`;
      text += ` Saya tertarik memesan layanan catering untuk acara *${acara || '-'}*`;
      if (tanggal) text += ` pada tanggal ${tanggal}`;
      if (tamu) text += ` dengan perkiraan ${tamu} tamu`;
      text += `.`;
      if (pesan) text += ` Catatan tambahan: ${pesan}`;
      text += ` Mohon info paket dan ketersediaannya, terima kasih.`;

      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  /* ---------- Tombol pesan cepat per paket -> WhatsApp ---------- */
  document.querySelectorAll('[data-wa-package]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pkg = btn.dataset.waPackage;
      const text = `Halo Kanaya Catering, saya ingin bertanya dan memesan paket ${pkg}. Mohon info lebih lanjut, terima kasih.`;
      window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
    });
  });

});
