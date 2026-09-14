// ==========================================================================
// SEKAR CIPTA — interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header: transparent -> solid on scroll ---------- */
  const header = document.querySelector('.site-header');
  const toggleHeaderState = () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  toggleHeaderState();
  window.addEventListener('scroll', toggleHeaderState, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      header.classList.toggle('menu-open');
    });
    document.querySelectorAll('.mobile-menu-inner a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        header.classList.remove('menu-open');
      });
    });
  }

  /* ---------- FAQ accordion: satu terbuka, sisanya tertutup bergantian ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(other => {
        other.classList.remove('open');
        const otherA = other.querySelector('.faq-a');
        if (otherA) otherA.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
  // buka item pertama secara default
  if (faqItems.length) {
    const first = faqItems[0];
    first.classList.add('open');
    const firstA = first.querySelector('.faq-a');
    if (firstA) firstA.style.maxHeight = firstA.scrollHeight + 'px';
  }

  /* ---------- Reveal on scroll ---------- */
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

  /* ---------- Set active nav link based on current page ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu-inner a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Simple contact form feedback (no backend) ---------- */
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Terkirim! Kami akan segera menghubungi Anda ✓';
      btn.style.opacity = '0.85';
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.style.opacity = '1'; }, 3500);
    });
  }

});
