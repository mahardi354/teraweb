// ================= HEADER SCROLL STATE =================
const header = document.querySelector('.site-header');
function onScrollHeader(){
  if (window.scrollY > 40) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');
}
window.addEventListener('scroll', onScrollHeader);
onScrollHeader();

// ================= MOBILE NAV TOGGLE =================
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav){
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('is-open');
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mainNav.classList.remove('is-open'));
  });
}

// ================= FAQ ACCORDION (satu buka, lainnya tutup) =================
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item').forEach(other => {
      other.classList.remove('is-open');
      other.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen){
      item.classList.add('is-open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ================= SCROLL REVEAL =================
const revealItems = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(el => io.observe(el));

// ================= FORM KONTAK -> WHATSAPP =================
// Nomor WhatsApp bisnis SEJUK.ID (ganti dengan nomor asli saat deploy)
const WA_NUMBER = "6281234567890";
const BRAND_NAME = "SEJUK.ID";

const contactForm = document.querySelector('#contact-form');
if (contactForm){
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nama = contactForm.nama.value.trim();
    const hp = contactForm.hp.value.trim();
    const alamat = contactForm.alamat.value.trim();
    const layanan = contactForm.layanan.value;
    const pesan = contactForm.pesan.value.trim();

    let text = `Halo ${BRAND_NAME}, saya ${nama || "(nama)"}.\n`;
    text += `Saya ingin menggunakan layanan: ${layanan || "(belum dipilih)"}.\n`;
    if (alamat) text += `Alamat: ${alamat}.\n`;
    if (pesan) text += `Catatan tambahan: ${pesan}.\n`;
    text += `No. HP saya: ${hp || "(nomor belum diisi)"}.\n`;
    text += `Mohon info jadwal dan estimasi biayanya. Terima kasih!`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });
}

// Tombol "Pesan via WhatsApp" cepat pada card layanan
document.querySelectorAll('[data-wa-service]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const service = btn.getAttribute('data-wa-service');
    const text = `Halo ${BRAND_NAME}, saya ingin bertanya dan booking untuk layanan "${service}". Apakah teknisi tersedia dalam waktu dekat?`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });
});
