// ===== ARDE LISTRIK — site interactions =====

document.addEventListener('DOMContentLoaded', () => {

  /* --- Header: transparent -> solid on scroll --- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Mobile nav toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* --- FAQ accordion: buka tutup bergantian (hanya satu terbuka) --- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const parent = item.closest('.faq-list');
      const isOpen = item.classList.contains('open');
      parent.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* --- Scroll reveal animations --- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
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

  /* --- Broken image graceful fallback --- */
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      if (img.parentElement) img.parentElement.classList.add('img-fallback');
    });
  });

  /* --- Contact form -> WhatsApp --- */
  const WA_NUMBER = '6281234567890'; // TODO: ganti dengan nomor WhatsApp bisnis ARDE Listrik
  const BUSINESS_NAME = 'ARDE Listrik';

  const waForm = document.getElementById('contactForm');
  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = waForm.querySelector('#name')?.value.trim() || '';
      const phone = waForm.querySelector('#phone')?.value.trim() || '';
      const service = waForm.querySelector('#service')?.value || '';
      const address = waForm.querySelector('#address')?.value.trim() || '';
      const message = waForm.querySelector('#message')?.value.trim() || '';

      let text = `Halo ${BUSINESS_NAME}, saya ${name || '(nama)'}.`;
      if (service) text += `\nSaya ingin bertanya / booking layanan: *${service}*.`;
      if (address) text += `\nLokasi: ${address}.`;
      if (message) text += `\nDetail kebutuhan: ${message}`;
      if (phone) text += `\n\nNo. HP saya: ${phone}`;
      text += `\n\nMohon info lebih lanjut, terima kasih.`;

      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  /* --- Quick WA buttons that mention a specific service (data-service attr) --- */
  document.querySelectorAll('[data-wa-service]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-wa-service');
      const text = `Halo ${BUSINESS_NAME}, saya ingin bertanya mengenai layanan *${service}*. Apakah bisa dibantu jadwalkan kunjungan / survey? Terima kasih.`;
      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  });

  /* --- Generic WA CTA (hero / floating button / cta banner) without prefilled service --- */
  document.querySelectorAll('[data-wa-generic]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = `Halo ${BUSINESS_NAME}, saya membutuhkan bantuan teknisi listrik. Mohon informasinya, terima kasih.`;
      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  });

  /* --- Current year in footer --- */
  document.querySelectorAll('.current-year').forEach(el => el.textContent = new Date().getFullYear());

});
