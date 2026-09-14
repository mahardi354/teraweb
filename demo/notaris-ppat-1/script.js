// ADIWANGSA — Notaris & PPAT — interaksi bersama semua halaman

document.addEventListener('DOMContentLoaded', () => {

  /* Header shadow saat scroll */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile nav */
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const scrim = document.querySelector('.nav-scrim');
  const closeBtn = document.querySelector('.mobile-nav-close');

  const openNav = () => { mobileNav?.classList.add('open'); scrim?.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeNav = () => { mobileNav?.classList.remove('open'); scrim?.classList.remove('open'); document.body.style.overflow = ''; };

  toggle?.addEventListener('click', openNav);
  closeBtn?.addEventListener('click', closeNav);
  scrim?.addEventListener('click', closeNav);
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* Accordion FAQ */
  document.querySelectorAll('.acc-item').forEach(item => {
    const trigger = item.querySelector('.acc-trigger');
    const panel = item.querySelector('.acc-panel');
    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.accordion')?.querySelectorAll('.acc-item').forEach(other => {
        other.classList.remove('open');
        const p = other.querySelector('.acc-panel');
        if (p) p.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* Counter animasi angka statistik */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target % 1 === 0 ? Math.floor(target * eased) : (target * eased).toFixed(1);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countIo.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countIo.observe(el));
  }

  /* Form kontak — simulasi kirim */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = 'Mengirim…';
      btn.disabled = true;
      setTimeout(() => {
        contactForm.style.display = 'none';
        document.querySelector('#form-success')?.classList.add('show');
      }, 900);
    });
  }

});
