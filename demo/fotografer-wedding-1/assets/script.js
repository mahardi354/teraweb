document.addEventListener('DOMContentLoaded', function () {

  /* ---- Header transparent -> solid on scroll ---- */
  var header = document.querySelector('.site-header');
  function onScroll(){
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll);

  /* ---- Mobile nav ---- */
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  var closeM = document.querySelector('.close-m');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () { mobileNav.classList.add('open'); });
    closeM.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    });
  }

  /* ---- FAQ accordion: satu terbuka bergantian ---- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---- Gallery filter (halaman portofolio) ---- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galItems = document.querySelectorAll('.gal-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      galItems.forEach(function (item) {
        if (cat === 'all' || item.getAttribute('data-cat') === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---- Contact form (demo, tanpa backend) ---- */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      note.textContent = 'Terima kasih! Pesan Anda telah terkirim. Tim kami akan menghubungi Anda dalam 1x24 jam.';
      note.classList.add('show');
      form.reset();
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
});
