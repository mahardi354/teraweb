// KKP Wicaksana & Rekan — shared interactions
document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('mobile-open');
      if (open) {
        links.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:74px;left:20px;right:20px;background:#fff;padding:14px;border-radius:16px;box-shadow:0 20px 50px rgba(10,26,46,0.18);border:1px solid #E2E6ED;';
      } else {
        links.style.cssText = '';
      }
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Contact form (demo only, no backend)
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = 'Terkirim ✓';
      btn.disabled = true;
      form.querySelectorAll('input, select, textarea').forEach(f => f.disabled = true);
      setTimeout(() => {
        alert('Terima kasih! Tim kami akan segera menghubungi Anda dalam 1x24 jam kerja.');
      }, 300);
    });
  }

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 8) header.style.boxShadow = '0 6px 20px rgba(10,26,46,0.08)';
      else header.style.boxShadow = 'none';
    });
  }
});
