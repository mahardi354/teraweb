// =========================================================
// GARIS. BARBERSHOP — main.js
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- HEADER: transparan -> solid saat discroll ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

    const backTop = document.querySelector('.back-top');
    if (backTop) {
      if (window.scrollY > 600) backTop.classList.add('show');
      else backTop.classList.remove('show');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- MOBILE NAV ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  /* ---------- BACK TO TOP ---------- */
  document.querySelector('.back-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- FAQ ACCORDION (buka satu, tutup lainnya) ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- FILTER GALERI / LAYANAN ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const buttons = group.querySelectorAll('.filter-btn');
    const targetSelector = group.dataset.filterGroup;
    const items = document.querySelectorAll(targetSelector);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        items.forEach(it => {
          const show = cat === 'semua' || it.dataset.cat === cat;
          it.style.display = show ? '' : 'none';
        });
      });
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
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

  /* ---------- FORM BOOKING -> kirim via WhatsApp ---------- */
  const bookingForm = document.querySelector('#booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(bookingForm);
      const nama = data.get('nama') || '-';
      const telp = data.get('telp') || '-';
      const layanan = data.get('layanan') || '-';
      const barber = data.get('barber') || 'Siapa saja';
      const tanggal = data.get('tanggal') || '-';
      const jam = data.get('jam') || '-';
      const catatan = data.get('catatan') || '-';

      const pesan =
`Halo GARIS. Barbershop, saya ingin booking:
Nama: ${nama}
No. HP: ${telp}
Layanan: ${layanan}
Barber pilihan: ${barber}
Tanggal: ${tanggal}
Jam: ${jam}
Catatan: ${catatan}`;

      const url = `https://wa.me/6281234567890?text=${encodeURIComponent(pesan)}`;
      window.open(url, '_blank');
    });
  }

  /* ---------- NEWSLETTER (demo, tanpa backend) ---------- */
  const newsForm = document.querySelector('.news-form');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsForm.querySelector('input');
      if (input.value.trim()) {
        input.value = '';
        input.placeholder = 'Terima kasih, sudah terdaftar! ✓';
      }
    });
  }

});
