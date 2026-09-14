// ============================================================
// SUVARNA — shared interactions
// ============================================================

// Sticky header state
const header = document.querySelector('.site-header');
function handleHeaderScroll(){
  if(!header) return;
  if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
  else { header.classList.remove('is-scrolled'); }
}
window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navCtaBtn = document.querySelector('.nav-cta .btn');
if(navToggle && navLinks){
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    if(navCtaBtn) navCtaBtn.classList.toggle('mobile-open');
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  if(!q) return;
  q.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  });
});

// Gallery filter (galeri.html)
const filterTabs = document.querySelectorAll('.filter-tab');
const galleryItems = document.querySelectorAll('[data-cat]');
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.filter;
    galleryItems.forEach(item => {
      const show = cat === 'all' || item.dataset.cat === cat;
      item.style.display = show ? '' : 'none';
    });
  });
});

// Contact form (kontak.html) — client-side only demo
const bookingForm = document.getElementById('booking-form');
if(bookingForm){
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = bookingForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Terkirim ✓';
    btn.style.opacity = '0.75';
    bookingForm.reset();
    setTimeout(() => { btn.textContent = original; btn.style.opacity = '1'; }, 2600);
  });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if(newsletterForm){
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterForm.querySelector('input').value = '';
    const btn = newsletterForm.querySelector('button');
    btn.style.transform = 'scale(1.3)';
    setTimeout(()=>{btn.style.transform='scale(1)';}, 300);
  });
}
