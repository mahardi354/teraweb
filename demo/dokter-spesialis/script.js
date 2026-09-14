// ============================================
// KIRANA SKIN CLINIC — Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Header transparent -> solid on scroll ----
  var header = document.querySelector('.site-header');
  function handleScroll(){
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- FAQ accordion (only one open at a time) ----
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Form kontak -> kirim ke WhatsApp ----
  // Ganti nomor di bawah ini dengan nomor WhatsApp praktik yang aktif.
  var WA_NUMBER = '6281234567890';
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nama = (document.getElementById('cfNama') || {}).value || '';
      var telepon = (document.getElementById('cfTelepon') || {}).value || '';
      var layanan = (document.getElementById('cfLayanan') || {}).value || '';
      var pesan = (document.getElementById('cfPesan') || {}).value || '';

      var lines = [
        'Halo, saya ingin membuat janji temu / bertanya melalui website:',
        '',
        'Nama: ' + nama,
        'No. WhatsApp: ' + telepon
      ];
      if (layanan.trim() !== '') lines.push('Layanan yang diminati: ' + layanan);
      if (pesan.trim() !== '') {
        lines.push('');
        lines.push('Pesan: ' + pesan);
      }

      var text = encodeURIComponent(lines.join('\n'));
      var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + text;

      window.open(waUrl, '_blank', 'noopener');
    });
  }

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

});
