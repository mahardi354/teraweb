// =========================================================
// SEJUK PRIMA AC CARE — main.js
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header: transparan -> solid saat discroll ---------- */
  var header = document.querySelector('.site-header');
  function onScrollHeader(){
    if (window.scrollY > 40) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }
  }
  if (header){
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive:true });
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav){
    navToggle.addEventListener('click', function(){
      mainNav.classList.toggle('open');
      var icon = navToggle.querySelector('i');
      if (icon){
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
    mainNav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        mainNav.classList.remove('open');
      });
    });
  }

  /* ---------- FAQ accordion: buka tutup bergantian ---------- */
  document.querySelectorAll('.faq-list').forEach(function(list){
    var items = list.querySelectorAll('.faq-item');
    items.forEach(function(item){
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      q.addEventListener('click', function(){
        var isActive = item.classList.contains('active');

        // tutup semua item lain dalam list yang sama
        items.forEach(function(other){
          other.classList.remove('active');
          other.querySelector('.faq-a').style.maxHeight = null;
        });

        // buka item ini jika sebelumnya belum aktif
        if (!isActive){
          item.classList.add('active');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- Form kontak -> kirim ke WhatsApp ---------- */
  var BUSINESS_NAME = 'Sejuk Prima AC Care';
  var WA_NUMBER = '6281234567890'; // ganti dengan nomor WhatsApp bisnis asli

  var contactForm = document.getElementById('contactForm');
  if (contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();

      var nama = document.getElementById('cf-nama').value.trim();
      var telepon = document.getElementById('cf-telepon').value.trim();
      var layanan = document.getElementById('cf-layanan').value;
      var alamat = document.getElementById('cf-alamat').value.trim();
      var pesan = document.getElementById('cf-pesan').value.trim();

      var text = 'Halo ' + BUSINESS_NAME + ', saya ' + (nama || '(nama belum diisi)') +
        ' ingin menggunakan layanan *' + (layanan || 'Servis AC') + '*.\n\n' +
        'No. HP: ' + (telepon || '-') + '\n' +
        'Alamat: ' + (alamat || '-') + '\n' +
        (pesan ? ('Catatan tambahan: ' + pesan + '\n') : '') +
        '\nMohon info jadwal & estimasi biayanya. Terima kasih.';

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  }

  /* ---------- Quick order buttons (data-service) -> WA langsung ---------- */
  document.querySelectorAll('[data-wa-service]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      var service = btn.getAttribute('data-wa-service');
      var text = 'Halo ' + BUSINESS_NAME + ', saya ingin bertanya sekaligus memesan layanan *' + service + '*. Apakah teknisi tersedia dalam waktu dekat?';
      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  });

  /* ---------- Tahun otomatis di footer ---------- */
  document.querySelectorAll('.current-year').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

});
