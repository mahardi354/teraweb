// ==========================================================================
// LINTASA TRANS — shared behaviour
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header: transparent -> solid on scroll ---------- */
  const header = document.querySelector('.site-header');
  const toggleHeader = () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  toggleHeader();
  window.addEventListener('scroll', toggleHeader, { passive: true });

  /* ---------- Mobile nav drawer ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => mobileNav.classList.add('open'));
  }
  if (mobileNavClose && mobileNav) {
    mobileNavClose.addEventListener('click', () => mobileNav.classList.remove('open'));
  }
  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', () => mobileNav && mobileNav.classList.remove('open'));
  });

  /* ---------- FAQ accordion (only one open at a time, per list) ---------- */
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
        });
        if (!isOpen) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  const waForm = document.getElementById('contactForm');
  if (waForm) {
    const BUSINESS_NAME = 'Lintasa Trans';
    const WHATSAPP_NUMBER = '6281234567890'; // ganti dengan nomor WhatsApp bisnis asli

    waForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nama = document.getElementById('cfNama').value.trim();
      const asal = document.getElementById('cfAsal').value;
      const tujuan = document.getElementById('cfTujuan').value;
      const tanggal = document.getElementById('cfTanggal').value;
      const penumpang = document.getElementById('cfPenumpang').value;
      const pesan = document.getElementById('cfPesan').value.trim();

      let text = `Halo ${BUSINESS_NAME}, saya ${nama || '(nama)'} ingin bertanya / memesan perjalanan.\n\n`;
      text += `Rute: ${asal || '-'} → ${tujuan || '-'}\n`;
      text += `Tanggal berangkat: ${tanggal || '-'}\n`;
      text += `Jumlah penumpang: ${penumpang || '-'}\n`;
      if (pesan) text += `Catatan tambahan: ${pesan}\n`;
      text += `\nMohon info jadwal dan ketersediaan kursinya. Terima kasih.`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  /* ---------- Quick search widget (home hero) -> WhatsApp ---------- */
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    const BUSINESS_NAME = 'Lintasa Trans';
    const WHATSAPP_NUMBER = '6281234567890';
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const asal = document.getElementById('sfAsal').value;
      const tujuan = document.getElementById('sfTujuan').value;
      const tanggal = document.getElementById('sfTanggal').value;
      const penumpang = document.getElementById('sfPenumpang').value;

      let text = `Halo ${BUSINESS_NAME}, saya ingin mencari jadwal perjalanan.\n\n`;
      text += `Rute: ${asal || '-'} → ${tujuan || '-'}\n`;
      text += `Tanggal berangkat: ${tanggal || '-'}\n`;
      text += `Jumlah penumpang: ${penumpang || '-'}\n\n`;
      text += `Mohon info jadwal keberangkatan dan harga tiketnya. Terima kasih.`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  /* ---------- Generic "pesan rute ini via WhatsApp" buttons ---------- */
  document.querySelectorAll('[data-wa-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      const BUSINESS_NAME = 'Lintasa Trans';
      const WHATSAPP_NUMBER = '6281234567890';
      const route = btn.getAttribute('data-wa-route');
      const text = `Halo ${BUSINESS_NAME}, saya ingin memesan tiket untuk rute ${route}. Mohon info jadwal dan ketersediaan kursinya. Terima kasih.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    });
  });

  /* ---------- Image fallback (guarantees no broken images) ---------- */
  document.querySelectorAll('img').forEach((img, idx) => {
    img.addEventListener('error', function () {
      const seed = (this.alt || 'lintasa-' + idx).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      this.src = `https://picsum.photos/seed/${seed}/900/700`;
    }, { once: true });
  });

  /* ---------- Set min date on date inputs to today ---------- */
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(inp => inp.min = today);

});
