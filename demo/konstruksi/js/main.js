(function () {
  var d = document, q = function (s, c) { return (c || d).querySelectorAll(s); };

  // Menu mobile
  var nt = d.getElementById('nt'), nav = d.getElementById('nav');
  if (nt && nav) {
    nt.addEventListener('click', function () {
      var o = nav.classList.toggle('open');
      nt.setAttribute('aria-expanded', o);
    });
    q('a', nav).forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); nt.setAttribute('aria-expanded', 'false'); });
    });
  }

  // Animasi muncul + penghitung angka (hanya saat terlihat)
  function count(el) {
    var to = +el.dataset.count, t0 = null, dur = 1600;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.floor(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step); else el.textContent = to;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        if (e.target.dataset.count) count(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    q('.rv,[data-count]').forEach(function (el) { io.observe(el); });
  } else {
    q('.rv').forEach(function (el) { el.classList.add('in'); });
    q('[data-count]').forEach(function (el) { el.textContent = el.dataset.count; });
  }

  // FAQ: hanya satu yang terbuka (cadangan untuk browser lama)
  var fd = q('.faq details');
  fd.forEach(function (x) {
    x.addEventListener('toggle', function () {
      if (!x.open) return;
      fd.forEach(function (y) { if (y !== x && y.parentNode === x.parentNode) y.open = false; });
    });
  });

  // Filter proyek
  var fb = q('.flt button');
  fb.forEach(function (b) {
    b.addEventListener('click', function () {
      fb.forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      var f = b.dataset.f;
      q('.pj').forEach(function (p) {
        p.classList.toggle('hide', f !== 'all' && p.dataset.c !== f);
      });
    });
  });

  // Peta dimuat hanya saat diklik (hemat bandwidth)
  var mb = d.getElementById('mapbtn');
  if (mb) mb.addEventListener('click', function () {
    var m = mb.parentNode, f = d.createElement('iframe');
    f.src = 'https://www.openstreetmap.org/export/embed.html?bbox=106.80%2C-6.245%2C106.83%2C-6.215&layer=mapnik&marker=-6.2297%2C106.8189';
    f.title = 'Peta lokasi kantor';
    f.loading = 'lazy';
    m.innerHTML = '';
    m.appendChild(f);
  });

  // Formulir -> WhatsApp
  var fm = d.getElementById('wa');
  if (fm) fm.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (n) { return (fm.elements[n] || {}).value || '-'; };
    var t = 'Halo BangunPrima, saya ingin konsultasi proyek.\n\n' +
      'Nama: ' + v('nama') + '\nTelepon: ' + v('telp') + '\nEmail: ' + v('email') +
      '\nLayanan: ' + v('layanan') + '\nPerkiraan anggaran: ' + v('anggaran') +
      '\nLokasi proyek: ' + v('lokasi') + '\n\nPesan:\n' + v('pesan');
    window.open('https://wa.me/6281200000000?text=' + encodeURIComponent(t), '_blank', 'noopener');
  });
})();
