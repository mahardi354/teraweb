// ================= SIGAP WC — main.js =================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header: transparent -> solid on scroll ---------- */
  var header = document.querySelector('.site-header');
  function handleScroll(){
    if(!header) return;
    if(window.scrollY > 40){
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      toggle.classList.toggle('open');
      nav.classList.toggle('mobile-open');
    });
    nav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        toggle.classList.remove('open');
        nav.classList.remove('mobile-open');
      });
    });
  }

  /* ---------- FAQ accordion (buka tutup bergantian) ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if(!q || !a) return;
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      // close all
      faqItems.forEach(function(other){
        other.classList.remove('open');
        var otherA = other.querySelector('.faq-a');
        if(otherA) otherA.style.maxHeight = null;
      });
      // open clicked one if it wasn't already open
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
  // open first FAQ by default
  if(faqItems.length){
    var first = faqItems[0];
    first.classList.add('open');
    var firstA = first.querySelector('.faq-a');
    if(firstA) firstA.style.maxHeight = firstA.scrollHeight + 'px';
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  var BUSINESS_NAME = 'Sigap WC';
  var WA_NUMBER = '6281234567890'; // ganti dengan nomor WhatsApp bisnis asli

  var form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();

      var nama = (form.querySelector('#nama') || {}).value || '-';
      var hp = (form.querySelector('#hp') || {}).value || '-';
      var layanan = (form.querySelector('#layanan') || {}).value || '-';
      var alamat = (form.querySelector('#alamat') || {}).value || '-';
      var pesan = (form.querySelector('#pesan') || {}).value || '-';

      var text = 'Halo ' + BUSINESS_NAME + ', saya ' + nama +
        ' ingin menggunakan layanan *' + layanan + '*.\n\n' +
        '📍 Alamat: ' + alamat + '\n' +
        '📞 No HP: ' + hp + '\n' +
        '📝 Keterangan: ' + pesan + '\n\n' +
        'Mohon info jadwal & estimasi biayanya. Terima kasih.';

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  }

  /* ---------- Quick order buttons (data-service) -> WhatsApp ---------- */
  document.querySelectorAll('[data-wa-service]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      var service = btn.getAttribute('data-wa-service');
      var text = 'Halo ' + BUSINESS_NAME + ', saya ingin bertanya sekaligus memesan layanan *' + service + '*. Apakah teknisi bisa datang hari ini?';
      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  });

  /* ---------- Generic WA float / CTA buttons without specific service ---------- */
  document.querySelectorAll('[data-wa-general]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      var text = 'Halo ' + BUSINESS_NAME + ', saya ingin bertanya tentang layanan sedot WC dan saluran.';
      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  });

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll('.current-year').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

});
