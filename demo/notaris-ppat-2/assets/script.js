// ===== Navbar scroll state =====
const navbar = document.querySelector('.navbar');
const onScroll = () => {
  if (window.scrollY > 12) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// ===== Mobile nav =====
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileClose = document.querySelector('.mobile-close');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => mobileNav.classList.add('open'));
  mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
}

// ===== FAQ Accordion (bergantian / one open at a time) =====
document.querySelectorAll('.accordion').forEach(acc => {
  const items = acc.querySelectorAll('.acc-item');
  items.forEach(item => {
    const q = item.querySelector('.acc-q');
    const a = item.querySelector('.acc-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.acc-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
});

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ===== Counter animation for stats =====
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current.toLocaleString('id-ID') + suffix;
      }, 20);
      cio.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(el => cio.observe(el));

// ===== Contact form (demo submit) =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Mengirim…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Terkirim! Kami akan segera menghubungi Anda ✓';
      contactForm.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3200);
    }, 900);
  });
}
