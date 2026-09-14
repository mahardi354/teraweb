// ==========================================================================
// SAJI CATERING — main.js
// ==========================================================================

const WA_NUMBER = "6281234567890"; // nomor WhatsApp bisnis (format internasional tanpa +)
const BRAND_NAME = "SAJI Catering";

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Header scroll state ---------------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navScrim = document.querySelector('.nav-scrim');
  const closeNav = () => { mainNav?.classList.remove('open'); navScrim?.classList.remove('open'); navToggle?.setAttribute('aria-expanded','false'); };
  navToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navScrim?.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navScrim?.addEventListener('click', closeNav);
  document.querySelectorAll('.main-nav a').forEach(a => a.addEventListener('click', closeNav));

  /* ---------------- Active nav link ---------------- */
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.main-nav a[data-page]').forEach(a => {
    if (a.dataset.page === current) a.classList.add('active');
  });

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------------- FAQ accordion (bergantian / single open) ---------------- */
  document.querySelectorAll('.faq-list').forEach(list => {
    const items = list.querySelectorAll('.faq-item');
    items.forEach(item => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(other => {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
          q.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ---------------- Menu filter tabs ---------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-grid-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      menuItems.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        item.classList.toggle('hide', !match);
      });
    });
  });

  /* ---------------- Year in footer ---------------- */
  document.querySelectorAll('.year-now').forEach(el => el.textContent = new Date().getFullYear());

  /* ---------------- WhatsApp contact form ---------------- */
  const waForm = document.getElementById('contactForm');
  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = waForm.nama?.value.trim() || '-';
      const telepon = waForm.telepon?.value.trim() || '-';
      const jenisAcara = waForm.jenisAcara?.value || '-';
      const tanggal = waForm.tanggal?.value || '-';
      const tamu = waForm.tamu?.value.trim() || '-';
      const pesan = waForm.pesan?.value.trim() || '-';

      const text =
`Halo ${BRAND_NAME}, saya ${nama} ingin bertanya seputar layanan catering.

Detail acara saya:
- No. WhatsApp: ${telepon}
- Jenis acara: ${jenisAcara}
- Tanggal acara: ${tanggal}
- Perkiraan jumlah tamu: ${tamu}
- Kebutuhan/pesan: ${pesan}

Mohon info paket dan ketersediaannya. Terima kasih 🙏`;

      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  /* ---------------- Quick WhatsApp buttons (data-wa-quick) ---------------- */
  document.querySelectorAll('[data-wa-quick]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = btn.getAttribute('data-wa-quick') || `Halo ${BRAND_NAME}, saya ingin bertanya tentang layanan catering.`;
      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    });
  });

});
