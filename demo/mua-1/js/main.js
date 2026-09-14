// ===== Header solid-on-scroll =====
const header = document.querySelector('.site-header');
function handleHeaderScroll(){
  if(!header) return;
  if(window.scrollY > 40){ header.classList.add('solid'); }
  else{ header.classList.remove('solid'); }
}
handleHeaderScroll();
window.addEventListener('scroll', handleHeaderScroll, { passive:true });

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if(navToggle && mainNav){
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const isOpen = mainNav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.innerHTML = isOpen
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== FAQ accordion (only one open at a time) =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  if(!q) return;
  q.addEventListener('click', () => {
    const alreadyOpen = item.classList.contains('active');
    document.querySelectorAll('.faq-item.active').forEach(other => {
      if(other !== item) other.classList.remove('active');
    });
    item.classList.toggle('active', !alreadyOpen);
  });
});

// ===== Gallery filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    galleryItems.forEach(item => {
      const match = cat === 'all' || item.dataset.category === cat;
      item.style.display = match ? '' : 'none';
    });
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ===== Vanity mirror bulbs (positions the little lights around the ring) =====
document.querySelectorAll('.mirror-frame .bulbs').forEach(bulbLayer => {
  const count = 16;
  for(let i=0;i<count;i++){
    const bulb = document.createElement('i');
    const angle = (360/count) * i;
    bulb.style.transform = `rotate(${angle}deg) translate(0, -50%) translateY(-1px)`;
    bulb.style.setProperty('--angle', angle+'deg');
    bulbLayer.appendChild(bulb);
  }
});
document.querySelectorAll('.mirror-frame .bulbs i').forEach((bulb) => {
  const parent = bulb.parentElement.getBoundingClientRect();
});

// Position bulbs properly using JS geometry after layout
function layoutBulbs(){
  document.querySelectorAll('.mirror-frame .bulbs').forEach(layer => {
    const r = layer.offsetWidth / 2;
    const items = layer.querySelectorAll('i');
    items.forEach((bulb, i) => {
      const angle = (2*Math.PI / items.length) * i - Math.PI/2;
      const x = r + r*Math.cos(angle) - 5;
      const y = r + r*Math.sin(angle) - 5;
      bulb.style.left = x+'px';
      bulb.style.top = y+'px';
      bulb.style.transform = 'none';
    });
  });
}
window.addEventListener('load', layoutBulbs);
window.addEventListener('resize', layoutBulbs);
