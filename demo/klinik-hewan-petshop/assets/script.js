// ==========================================================================
// GRIYA SATWA — script.js
// Header scroll state, mobile nav, FAQ accordion, scroll reveal, image fallback
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header: transparan -> solid saat discroll ---------- */
  var header = document.querySelector('.site-header');
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('solid');
      header.classList.remove('no-solid');
    } else {
      header.classList.remove('solid');
      header.classList.add('no-solid');
    }
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* ---------- FAQ accordion: buka tutup bergantian (satu terbuka) ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    // set initial max-height for closed state
    a.style.maxHeight = item.classList.contains('open') ? a.scrollHeight + 'px' : '0px';
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // tutup semua item lain dalam grup yang sama
      var group = item.closest('.faq-list');
      if (group) {
        group.querySelectorAll('.faq-item.open').forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove('open');
            var openA = openItem.querySelector('.faq-a');
            if (openA) openA.style.maxHeight = '0px';
          }
        });
      }
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = '0px';
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
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

  /* ---------- Tag filter (halaman layanan) ---------- */
  var tagPills = document.querySelectorAll('.tag-pill');
  var filterables = document.querySelectorAll('[data-category]');
  if (tagPills.length && filterables.length) {
    tagPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        tagPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        var cat = pill.getAttribute('data-filter');
        filterables.forEach(function (card) {
          if (cat === 'semua' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- Simple contact form feedback (tanpa backend) ---------- */

});

/* ---------- Fallback gambar jika gagal dimuat ---------- */
function imgFallback(el) {
  el.onerror = null;
  var wrap = el.closest('.ph-wrap');
  if (wrap) wrap.classList.add('broken');
}
