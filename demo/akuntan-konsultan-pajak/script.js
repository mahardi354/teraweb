// ===== Header transparent -> solid on scroll =====
const header = document.querySelector('.site-header');
function handleScrollHeader(){
  if(!header) return;
  if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
  else{ header.classList.remove('is-scrolled'); }
}
handleScrollHeader();
window.addEventListener('scroll', handleScrollHeader, { passive:true });

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if(navToggle && nav){
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));
}

// ===== FAQ accordion (satu terbuka pada satu waktu) =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    item.closest('.faq-list').querySelectorAll('.faq-item').forEach(other => {
      other.classList.remove('is-open');
      other.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('is-open');
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
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ===== Footer year =====
document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());

// ===== Contact form -> kirim ke WhatsApp =====
// Ganti nomor di bawah ini dengan nomor WhatsApp bisnis Anda (format internasional, tanpa "+", spasi, atau tanda hubung)
const WHATSAPP_NUMBER = '6281234567890';

const contactForm = document.querySelector('#contact-form');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    const nama = document.querySelector('#nama').value.trim();
    const telepon = document.querySelector('#telepon').value.trim();
    const email = document.querySelector('#email').value.trim();
    const layananSelect = document.querySelector('#layanan');
    const layanan = layananSelect ? layananSelect.value : '';
    const pesan = document.querySelector('#pesan').value.trim();

    const teks =
`Halo Adiguna & Rekan, saya ingin berkonsultasi.

Nama: ${nama}
No. Telepon: ${telepon}
Email: ${email}
Layanan yang diminati: ${layanan}

Pesan:
${pesan}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(teks)}`;

    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Membuka WhatsApp... ✓';

    window.open(url, '_blank');

    setTimeout(() => { btn.textContent = original; }, 3000);
  });
}
