// ==========================================================================
// SIGAP WC — shared behaviours across all pages
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header: transparent -> solid on scroll ---------- */
  var header = document.querySelector('.site-header');
  function onScroll () {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      header.classList.toggle('nav-open');
    });
    document.querySelectorAll('.main-nav a').forEach(function (a) {
      a.addEventListener('click', function () { header.classList.remove('nav-open'); });
    });
  }

  /* ---------- FAQ accordion (one open at a time) ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Contact form -> WhatsApp ---------- */
  var BUSINESS_NAME = 'SIGAP WC';
  var WHATSAPP_NUMBER = '6281234567890'; // ganti dengan nomor WhatsApp bisnis asli

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nama = (form.querySelector('#nama') || {}).value || '';
      var telepon = (form.querySelector('#telepon') || {}).value || '';
      var alamat = (form.querySelector('#alamat') || {}).value || '';
      var layanan = (form.querySelector('#layanan') || {}).value || '';
      var waktu = (form.querySelector('#waktu') || {}).value || '';
      var pesan = (form.querySelector('#pesan') || {}).value || '';

      if (!nama || !telepon) {
        alert('Mohon isi Nama dan Nomor WhatsApp terlebih dahulu ya.');
        return;
      }

      var lines = [
        'Halo ' + BUSINESS_NAME + ', saya ' + nama + '.',
        'Saya ingin menggunakan layanan ' + (layanan || 'sedot WC') + '.',
        alamat ? ('Lokasi: ' + alamat + '.') : '',
        waktu ? ('Waktu yang diinginkan: ' + waktu + '.') : '',
        'Nomor WhatsApp saya: ' + telepon + '.',
        pesan ? ('Catatan tambahan: ' + pesan) : ''
      ].filter(Boolean);

      var text = encodeURIComponent(lines.join('\n'));
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;
      window.open(url, '_blank');
    });
  }

  /* ---------- Simple reveal-on-scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

});
