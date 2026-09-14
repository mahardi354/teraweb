// ===== Header scroll state =====
const header = document.querySelector('.site-header');
const backToTop = document.querySelector('.back-to-top');

function handleScroll(){
  if(window.scrollY > 40){
    header.classList.add('scrolled');
  }else{
    header.classList.remove('scrolled');
  }
  if(backToTop){
    if(window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }
}
window.addEventListener('scroll', handleScroll, {passive:true});
handleScroll();

if(backToTop){
  backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if(navToggle && mainNav){
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

// ===== FAQ accordion (bergantian: buka satu tutup lainnya) =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const parent = item.closest('.faq-list');
    const isOpen = item.classList.contains('open');
    parent.querySelectorAll('.faq-item').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
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
  }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
  revealEls.forEach(el => io.observe(el));
}else{
  revealEls.forEach(el => el.classList.add('in'));
}

// ===== Fallback gambar jika gagal dimuat =====
function imgFallback(img){
  img.onerror = null;
  img.style.objectFit = 'cover';
  img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
    '<rect width="400" height="400" fill="#EAF1E7"/>' +
    '<g fill="none" stroke="#1F5C52" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="68" y="88" width="264" height="200" rx="18"/>' +
    '<circle cx="150" cy="158" r="24"/>' +
    '<path d="M68 258 L162 188 L222 236 L272 196 L332 258"/>' +
    '</g></svg>'
  );
}
