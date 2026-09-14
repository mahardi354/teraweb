// =========================================================
// RADITYA PROPERTI — shared interactions
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header: transparent -> solid on scroll ---------- */
  var header = document.querySelector('.site-header');
  function handleScroll () {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
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

  /* ---------- Active nav link by current page ---------- */
  var current = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === current) a.classList.add('active');
  });

  /* ---------- FAQ accordion: one open at a time ---------- */
  document.querySelectorAll('.faq-list').forEach(function (list) {
    var items = list.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      q.addEventListener('click', function () {
        var isActive = item.classList.contains('active');
        items.forEach(function (other) {
          other.classList.remove('active');
          other.querySelector('.faq-a').style.maxHeight = null;
        });
        if (!isActive) {
          item.classList.add('active');
          a.style.maxHeight = a.scrollHeight + 40 + 'px';
        }
      });
    });
    // open first item by default
    if (items.length) {
      items[0].classList.add('active');
      var firstA = items[0].querySelector('.faq-a');
      firstA.style.maxHeight = firstA.scrollHeight + 40 + 'px';
    }
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Property filter tabs (properti.html) ---------- */
  var tabs = document.querySelectorAll('.tab-btn');
  var propCards = document.querySelectorAll('[data-category]');
  if (tabs.length && propCards.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var cat = tab.getAttribute('data-filter');
        propCards.forEach(function (card) {
          if (cat === 'semua' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- Contact form: kirim langsung ke WhatsApp ---------- */
  var form = document.querySelector('#contact-form');
  if (form) {
    // Nomor WhatsApp tujuan (format internasional, tanpa + / spasi / strip)
    var WA_NUMBER = '6281234567890';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Pastikan field wajib terisi sebelum lanjut ke WhatsApp
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) {
        return;
      }

      var nama = (form.querySelector('#nama') || {}).value || '-';
      var telepon = (form.querySelector('#telepon') || {}).value || '-';
      var email = (form.querySelector('#email') || {}).value || '-';
      var kebutuhanEl = form.querySelector('#kebutuhan');
      var kebutuhan = kebutuhanEl ? kebutuhanEl.value : '-';
      var pesan = (form.querySelector('#pesan') || {}).value || '-';

      var teks =
        'Halo Raditya Properti, saya ingin konsultasi:\n\n' +
        '*Nama:* ' + nama + '\n' +
        '*No. WhatsApp:* ' + telepon + '\n' +
        '*Email:* ' + email + '\n' +
        '*Jenis Kebutuhan:* ' + kebutuhan + '\n' +
        '*Pesan:*\n' + pesan;

      var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(teks);

      // Tampilkan status sekilas, lalu buka WhatsApp di tab baru
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.innerHTML;
      btn.innerHTML = 'Membuka WhatsApp… ✓';
      btn.style.background = 'var(--sage)';
      btn.style.color = '#fff';

      window.open(waUrl, '_blank');

      form.reset();
      setTimeout(function () {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.style.color = '';
      }, 3200);
    });
  }

});
