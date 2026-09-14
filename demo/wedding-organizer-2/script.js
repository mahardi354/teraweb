// SEUNTAI — script.js
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  /* ---- Reveal on scroll ---- */
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

  /* ---- Stat counters ---- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let cur = 0;
          const step = Math.max(1, Math.ceil(target / 60));
          const timer = setInterval(() => {
            cur += step;
            if (cur >= target) { cur = target; clearInterval(timer); }
            el.textContent = cur + suffix;
          }, 24);
          countIo.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => countIo.observe(el));
  }

  /* ---- Gallery filter (galeri.html) ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid .photo-card');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
          const match = cat === 'all' || item.getAttribute('data-cat') === cat;
          item.classList.toggle('hide', !match);
        });
      });
    });
  }

  /* ---- FAQ accordion: hanya satu yang terbuka dalam satu waktu ---- */
  document.querySelectorAll('.accordion').forEach(group => {
    const items = group.querySelectorAll('.acc-item');
    items.forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          items.forEach(other => {
            if (other !== item) other.removeAttribute('open');
          });
        }
      });
    });
  });

  /* ---- Contact form (demo only, no backend) ---- */
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Terkirim ✓';
      form.reset();
      setTimeout(() => { btn.textContent = original; }, 2600);
    });
  }

  /* ---- Header shadow on scroll ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 12 ? '0 8px 24px -18px rgba(18,36,29,0.4)' : 'none';
    });
  }
});
