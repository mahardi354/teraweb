// RUMAH & KARYA — shared interactions
document.addEventListener('DOMContentLoaded', function () {
  // mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // portfolio filter
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projCards = document.querySelectorAll('[data-category]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      projCards.forEach(function (card) {
        if (cat === 'semua' || card.getAttribute('data-category') === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // image fallback: if an unsplash image fails, swap to a picsum placeholder
  document.querySelectorAll('img[data-fallback-seed]').forEach(function (img) {
    img.addEventListener('error', function () {
      var seed = img.getAttribute('data-fallback-seed');
      img.onerror = null;
      img.src = 'https://picsum.photos/seed/' + seed + '/900/700';
    }, { once: true });
  });
});
