// ==========================================================================
// PRAMANA & REKAN — interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Sticky header shadow ----------
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
    toTopBtn && toTopBtn.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav toggle ----------
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    }));
  }

  // ---------- FAQ accordion (buka tutup bergantian) ----------
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q && q.addEventListener('click', () => {
      const group = item.closest('.faq-list');
      const wasOpen = item.classList.contains('open');
      if (group) {
        group.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      }
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // ---------- Stat counters ----------
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = (target * eased);
      el.textContent = (target % 1 === 0 ? Math.floor(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  }

  // ---------- Back to top ----------
  const toTopBtn = document.querySelector('.to-top');
  toTopBtn && toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---------- Contact form (demo, no backend) ----------
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }

  // ---------- Footer year ----------
  document.querySelectorAll('.current-year').forEach(el => el.textContent = new Date().getFullYear());

});
