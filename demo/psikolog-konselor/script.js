// ============ HEADER: transparent -> solid on scroll ============
const header = document.querySelector('.site-header');
function handleScroll(){
  if(!header) return;
  if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
  else{ header.classList.remove('is-scrolled'); }
}
window.addEventListener('scroll', handleScroll, { passive:true });
handleScroll();

// ============ MOBILE NAV ============
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if(navToggle && navLinks){
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// ============ FAQ ACCORDION (only one open at a time) ============
document.querySelectorAll('.faq-list').forEach(list => {
  const items = list.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
        other.querySelector('.faq-question').setAttribute('aria-expanded','false');
      });
      if(!isOpen){
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded','true');
      }
    });
  });
});

// ============ KIRIM FORM KE WHATSAPP ============
const WHATSAPP_NUMBER = '6281234567890'; // ganti dengan nomor WhatsApp praktik yang sebenarnya (format: kode negara tanpa + atau 0 di depan)

const formReservasi = document.querySelector('#formReservasi');
if(formReservasi){
  formReservasi.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = formReservasi.querySelector('#nama').value.trim();
    const hp = formReservasi.querySelector('#hp').value.trim();
    const email = formReservasi.querySelector('#email').value.trim();
    const layanan = formReservasi.querySelector('#layanan').value;
    const pesan = formReservasi.querySelector('#pesan').value.trim();

    if(!nama || !hp || !email){
      alert('Mohon lengkapi Nama, Nomor WhatsApp, dan Email terlebih dahulu.');
      return;
    }

    let text = `Halo Ruang Pulih, saya ingin membuat janji konsultasi.\n\n`;
    text += `*Nama:* ${nama}\n`;
    text += `*No. WhatsApp:* ${hp}\n`;
    text += `*Email:* ${email}\n`;
    text += `*Layanan yang diminati:* ${layanan}\n`;
    if(pesan){ text += `*Cerita/Kebutuhan:* ${pesan}\n`; }

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener');
  });
}

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}
