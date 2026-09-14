document.addEventListener('DOMContentLoaded', function () {
  var mount = document.getElementById('site-footer-include');
  if (!mount) return;

  mount.innerHTML = `
  <div class="container">
    <div class="footer-grid">
      <div>
        <a href="index.html" class="brand" aria-label="Sejuk Prima AC Care — Beranda">
          <span class="brand-mark"><i class="fa-solid fa-snowflake"></i></span>
          Sejuk<span>Prima</span>
        </a>
        <p class="desc">Layanan cuci AC, isi freon, perbaikan, pasang baru, dan kontrak maintenance untuk rumah maupun kantor. Teknisi bersertifikat, garansi jelas.</p>
        <div class="footer-social">
          <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
      <div>
        <h4>Navigasi</h4>
        <ul>
          <li><a href="index.html">Beranda</a></li>
          <li><a href="layanan.html">Layanan</a></li>
          <li><a href="tentang.html">Tentang Kami</a></li>
          <li><a href="kontak.html">Kontak</a></li>
        </ul>
      </div>
      <div>
        <h4>Layanan</h4>
        <ul>
          <li><a href="layanan.html">Cuci AC Rutin</a></li>
          <li><a href="layanan.html">Isi Freon</a></li>
          <li><a href="layanan.html">Perbaikan AC</a></li>
          <li><a href="layanan.html">Pasang Baru</a></li>
          <li><a href="layanan.html">Kontrak Kantor</a></li>
        </ul>
      </div>
      <div>
        <h4>Kontak</h4>
        <ul>
          <li><a href="https://wa.me/6281234567890" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i>&nbsp; 0812-3456-7890</a></li>
          <li><a href="mailto:halo@sejukprima.id"><i class="fa-solid fa-envelope"></i>&nbsp; halo@sejukprima.id</a></li>
          <li><a href="kontak.html"><i class="fa-solid fa-location-dot"></i>&nbsp; Jl. Melati Raya No. 21, Jakarta Selatan</a></li>
          <li><a href="kontak.html"><i class="fa-solid fa-clock"></i>&nbsp; Setiap Hari, 07.00–21.00 · Darurat 24 Jam</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span class="current-year"></span> Sejuk Prima AC Care. Seluruh hak cipta dilindungi.</span>
      <span>Dibuat dengan perawatan yang sama telitinya seperti servis AC kami ❄️</span>
    </div>
  </div>
  `;
});
