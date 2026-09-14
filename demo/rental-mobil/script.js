// ============================================================
// LAJU — shared behaviour across all pages
// ============================================================

// --- Header: transparent -> solid on scroll ---------------
const header = document.querySelector('.site-header');
function handleScroll(){
  if(!header) return;
  if(window.scrollY > 40){
    header.classList.add('is-scrolled');
  }else{
    header.classList.remove('is-scrolled');
  }
}
window.addEventListener('scroll', handleScroll, {passive:true});
handleScroll();

// --- Mobile nav toggle --------------------------------------
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if(navToggle && mainNav){
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-open');
    mainNav.classList.toggle('is-open');
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      mainNav.classList.remove('is-open');
    });
  });
}

// --- FAQ accordion: only one open at a time -----------------
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  if(!q || !a) return;
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-a').style.maxHeight = null;
      openItem.querySelector('.faq-q').setAttribute('aria-expanded','false');
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
      q.setAttribute('aria-expanded','true');
    }
  });
});

// --- Fleet filter (Armada page) ------------------------------
const filterBtns = document.querySelectorAll('.fleet-filter button');
const carCards = document.querySelectorAll('[data-category]');
if(filterBtns.length && carCards.length){
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      carCards.forEach(card => {
        const show = cat === 'semua' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// --- Reveal on scroll ------------------------------------------
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
  revealEls.forEach(el => io.observe(el));
}else{
  revealEls.forEach(el => el.classList.add('in'));
}

// --- WhatsApp contact form -----------------------------------
const BUSINESS_NAME = "Laju Rental Mobil";
const WA_NUMBER = "6281234567890"; // ganti dengan nomor WhatsApp bisnis Anda

const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const phone = document.getElementById('cf-phone').value.trim();
    const car = document.getElementById('cf-car')?.value || '';
    const dateStart = document.getElementById('cf-start')?.value || '';
    const dateEnd = document.getElementById('cf-end')?.value || '';
    const message = document.getElementById('cf-message').value.trim();

    let text = `Halo ${BUSINESS_NAME}, saya ${name}.\n`;
    text += `Saya ingin bertanya / melakukan pemesanan mobil.\n\n`;
    if(car) text += `Mobil yang diminati: ${car}\n`;
    if(dateStart) text += `Tanggal mulai sewa: ${dateStart}\n`;
    if(dateEnd) text += `Tanggal selesai sewa: ${dateEnd}\n`;
    if(phone) text += `No. HP saya: ${phone}\n`;
    if(message) text += `\nPesan tambahan:\n${message}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

// --- Quick "sewa via WhatsApp" buttons on car cards -----------
document.querySelectorAll('[data-wa-car]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const carName = btn.getAttribute('data-wa-car');
    const text = `Halo ${BUSINESS_NAME}, saya ingin menanyakan ketersediaan dan menyewa ${carName}. Mohon info lebih lanjut ya, terima kasih.`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
});

// --- Footer year ------------------------------------------------
document.querySelectorAll('.year-now').forEach(el => {
  el.textContent = new Date().getFullYear();
});
