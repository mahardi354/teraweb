// ===== Mobile menu toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // ===== Sticky header shadow on scroll =====
  const header = document.querySelector('header.site');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 12 ? '0 8px 24px -16px rgba(22,40,58,.4)' : 'none';
    });
  }

  // ===== Reveal on scroll =====
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));

  // ===== FAQ accordion =====
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q && q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ===== Portfolio filter =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      portfolioCards.forEach(card => {
        card.style.display = (cat === 'semua' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });

  // ===== Contact form (demo only, no backend) =====
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      document.querySelector('.form-success')?.classList.add('show');
      form.reset();
      setTimeout(() => document.querySelector('.form-success')?.classList.remove('show'), 6000);
    });
  }

  // ===== Image fallback to picsum if unsplash fails =====
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', function handler() {
      this.src = this.dataset.fallback;
      this.removeEventListener('error', handler);
    }, { once: true });
  });
});
