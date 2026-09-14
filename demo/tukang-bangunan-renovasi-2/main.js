// ============================================================
// BATA & BAJA — shared site behavior
// ============================================================

// --- Header: transparent -> solid on scroll ---
(function(){
  var header = document.querySelector('.site-header');
  if(!header) return;
  function onScroll(){
    if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
    else{ header.classList.remove('is-scrolled'); }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
})();

// --- Mobile nav toggle ---
(function(){
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', function(){
    toggle.classList.toggle('is-open');
    nav.classList.toggle('is-open');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      toggle.classList.remove('is-open');
      nav.classList.remove('is-open');
    });
  });
})();

// --- FAQ accordion (exclusive: opening one closes the others) ---
(function(){
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function(item){
    var q = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-answer');
    if(!q || !answer) return;
    q.addEventListener('click', function(){
      var willOpen = !item.classList.contains('is-open');
      items.forEach(function(other){
        other.classList.remove('is-open');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });
      if(willOpen){
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();

// --- Portfolio filter ---
(function(){
  var buttons = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.gallery-item');
  if(!buttons.length || !items.length) return;
  buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
      buttons.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      items.forEach(function(item){
        var match = (cat === 'semua') || (item.getAttribute('data-cat') === cat);
        item.classList.toggle('is-hidden', !match);
      });
    });
  });
})();

// --- Reveal on scroll ---
(function(){
  var els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  if(!('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  els.forEach(function(el){ io.observe(el); });
})();

// --- Contact form -> WhatsApp ---
(function(){
  var form = document.getElementById('contact-form');
  if(!form) return;
  var WA_NUMBER = '6281234567890'; // TODO: ganti dengan nomor WhatsApp asli bisnis
  var BUSINESS_NAME = 'BATA & BAJA';

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var nama = (form.querySelector('#f-nama').value || '').trim();
    var telepon = (form.querySelector('#f-telepon').value || '').trim();
    var layanan = form.querySelector('#f-layanan').value || '';
    var lokasi = (form.querySelector('#f-lokasi').value || '').trim();
    var pesan = (form.querySelector('#f-pesan').value || '').trim();

    var lines = [
      'Halo ' + BUSINESS_NAME + ', saya ' + (nama || '-') + '.',
      'Saya membutuhkan layanan: ' + (layanan || '-') + '.'
    ];
    if(lokasi){ lines.push('Lokasi proyek: ' + lokasi + '.'); }
    if(pesan){ lines.push('Detail kebutuhan: ' + pesan); }
    if(telepon){ lines.push('Nomor WhatsApp saya: ' + telepon); }
    lines.push('Mohon info lebih lanjut ya, terima kasih!');

    var text = encodeURIComponent(lines.join('\n'));
    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + text;
    window.open(url, '_blank');
  });
})();

