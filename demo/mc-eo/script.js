// =====================================================
// PANGGUNG CERITA — shared interactions
// =====================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header: transparent -> solid on scroll ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      mainNav.classList.toggle('mobile-open');
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mainNav.classList.remove('mobile-open');
      });
    });
  }

  /* ---------- FAQ accordion (alternating open/close) ---------- */
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
    // open first item by default
    if (items[0]) items[0].querySelector('.faq-q').click();
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const dur = 1600;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.round(target * eased);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countIo.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => countIo.observe(el));
  }

  /* ---------- Waveform bars random heights ---------- */
  document.querySelectorAll('.waveform').forEach(wf => {
    const bars = wf.querySelectorAll('span');
    bars.forEach((b, i) => {
      const h = 10 + Math.round(Math.random() * 24);
      b.style.height = h + 'px';
      b.style.animationDelay = (i * 0.09) + 's';
    });
  });

});
