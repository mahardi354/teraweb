// ================== Header scroll state ==================
const header = document.querySelector('.site-header');
function onScroll(){
  if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
  else{ header.classList.remove('is-scrolled'); }
}
window.addEventListener('scroll', onScroll);
onScroll();

// ================== Mobile nav toggle ==================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if(navToggle){
  navToggle.addEventListener('click', ()=>{
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> navLinks.classList.remove('open'));
  });
}

// ================== FAQ Accordion (satu terbuka, sisanya tertutup) ==================
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  // set tinggi awal untuk item yang sudah diberi class "open" di HTML
  if(item.classList.contains('open')){
    a.style.maxHeight = a.scrollHeight + 'px';
  }
  q.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    // tutup semua item lain dalam grup yang sama
    const group = item.closest('.faq-list');
    group.querySelectorAll('.faq-item.open').forEach(other=>{
      if(other !== item){
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      }
    });
    if(isOpen){
      item.classList.remove('open');
      a.style.maxHeight = null;
    } else {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ================== Before / After slider ==================
document.querySelectorAll('.ba-wrap').forEach(wrap=>{
  const before = wrap.querySelector('.ba-before');
  const handle = wrap.querySelector('.ba-handle');
  const input = wrap.querySelector('.ba-slider-input');
  function setPos(pct){
    pct = Math.max(0, Math.min(100, pct));
    before.style.width = pct + '%';
    handle.style.left = pct + '%';
  }
  if(input){
    input.addEventListener('input', (e)=> setPos(e.target.value));
  }
});

// ================== Reveal on scroll ==================
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && revealEls.length){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.15});
  revealEls.forEach(el=> io.observe(el));
} else {
  revealEls.forEach(el=> el.classList.add('in'));
}

// ================== WhatsApp form handler (Kontak page) ==================
// Sapaan selalu merujuk ke nama bisnis. Label tombol TIDAK diubah oleh JS.
const WA_NUMBER = '6281234567895';

function kirimKeWhatsApp(e){
  e.preventDefault();
  const nama = document.getElementById('cf-nama').value.trim() || '(tanpa nama)';
  const telp = document.getElementById('cf-telp').value.trim();
  const layanan = document.getElementById('cf-layanan').value;
  const lokasi = document.getElementById('cf-lokasi').value.trim();
  const pesan = document.getElementById('cf-pesan').value.trim();

  let text = `Halo ANYAM Karpet & Sofa Care, saya ${nama}. `;
  text += `Saya tertarik untuk pesan layanan: ${layanan}. `;
  if(lokasi) text += `Lokasi saya di ${lokasi}. `;
  if(pesan) text += `Catatan tambahan: ${pesan}. `;
  if(telp) text += `No. HP saya ${telp}, mohon info jadwal & estimasi biayanya. Terima kasih.`;
  else text += `Mohon info jadwal & estimasi biayanya. Terima kasih.`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  return false;
}
const cf = document.getElementById('contact-form');
if(cf){ cf.addEventListener('submit', kirimKeWhatsApp); }
