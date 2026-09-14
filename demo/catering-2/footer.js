document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('footer-include');
  if (!el) return;
  el.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="brand">
          <span class="mark">K</span>
          <span>Kanaya<small>Catering &amp; Prasmanan</small></span>
        </a>
        <p>Dapur keluarga yang menghadirkan rasa rumah untuk pernikahan, acara korporat, ulang tahun, dan pengajian di Brebes, Tegal, Pemalang &amp; sekitarnya sejak 2012.</p>
        <div class="footer-social">
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z"/></svg></a>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.5 3.5A11 11 0 0 0 3.6 17.4L2 22l4.7-1.6A11 11 0 1 0 20.5 3.5Z"/></svg></a>
          <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 3v10.5a3.5 3.5 0 1 1-3.5-3.5M15 3a5 5 0 0 0 5 5"/></svg></a>
        </div>
      </div>
      <div>
        <h5>Jelajahi</h5>
        <ul>
          <li><a href="index.html">Beranda</a></li>
          <li><a href="paket.html">Paket &amp; Menu</a></li>
          <li><a href="galeri.html">Galeri</a></li>
          <li><a href="kontak.html">Kontak &amp; Tentang</a></li>
        </ul>
      </div>
      <div>
        <h5>Layanan</h5>
        <ul>
          <li><a href="paket.html">Pernikahan</a></li>
          <li><a href="paket.html">Korporat &amp; Meeting</a></li>
          <li><a href="paket.html">Ulang Tahun</a></li>
          <li><a href="paket.html">Pengajian &amp; Arisan</a></li>
          <li><a href="paket.html">Nasi Box Harian</a></li>
        </ul>
      </div>
      <div>
        <h5>Kontak Kami</h5>
        <ul class="footer-contact">
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/></svg><span>Jl. Raya Ketanggungan No. 45, Brebes, Jawa Tengah</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.5 3.5A11 11 0 0 0 3.6 17.4L2 22l4.7-1.6A11 11 0 1 0 20.5 3.5Z"/></svg><span>0812-3456-7890 (WhatsApp)</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><span>halo@kanayacatering.id</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg><span>Setiap hari, 07.00 &ndash; 20.00 WIB</span></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; 2026 Kanaya Catering. Seluruh hak cipta dilindungi.</span>
      <span>Dibuat dengan ♡ untuk merayakan setiap momen Anda.</span>
    </div>
  `;
});
