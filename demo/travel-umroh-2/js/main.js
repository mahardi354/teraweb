document.addEventListener('DOMContentLoaded', function () {
  // FAQ accordion: only one item open at a time within the same .faq group
  document.querySelectorAll('.faq').forEach(function (faqGroup) {
    var items = faqGroup.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (item.open) {
          items.forEach(function (other) {
            if (other !== item) other.removeAttribute('open');
          });
        }
      });
    });
  });

  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // simple counter animation for stats when visible
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          var current = 0;
          var step = Math.max(1, Math.ceil(target / 60));
          var timer = setInterval(function () {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current.toLocaleString('id-ID') + suffix;
          }, 25);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { obs.observe(c); });
  }
});
