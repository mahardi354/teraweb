/* TeraWeb — JavaScript ringan (tanpa library).
   GANTI nomor WhatsApp di bawah ini (format internasional, tanpa + dan tanpa spasi).
   Contoh: 6281234567890 */
(function () {
  "use strict";

  var CONFIG = {
    wa: "6285227272999"
  };

  var waReady = /^\d{9,15}$/.test(CONFIG.wa);

  function waUrl(message) {
    return "https://wa.me/" + CONFIG.wa + "?text=" + encodeURIComponent(message);
  }

  // Semua tautan dengan atribut data-wa dibuka ke WhatsApp dengan pesan siap kirim.
  if (waReady) {
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = waUrl(a.getAttribute("data-wa"));
      a.target = "_blank";
      a.rel = "noopener";
    });
  } else if (window.console) {
    console.warn("TeraWeb: nomor WhatsApp belum diatur. Edit CONFIG.wa di assets/app.js.");
  }

  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Tahun di footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Formulir kontak: menyusun pesan lalu membuka WhatsApp
  var form = document.getElementById("form-kontak");
  if (form) {
    var err = document.getElementById("form-error");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nama = form.nama.value.trim();
      var usaha = form.usaha.value.trim();
      var jenis = form.jenis.value;
      var paket = form.querySelector("input[name=paket]:checked");
      var catatan = form.catatan.value.trim();

      if (!nama) { err.textContent = "Isi nama Anda dulu supaya kami tahu harus menyapa siapa."; form.nama.focus(); return; }
      if (!jenis) { err.textContent = "Pilih jenis usaha Anda supaya kami bisa mengirim contoh yang sesuai."; form.jenis.focus(); return; }
      if (!waReady) { err.textContent = "Nomor WhatsApp belum diatur. Buka assets/app.js dan isi CONFIG.wa."; return; }
      err.textContent = "";

      var lines = [
        "Halo TeraWeb, saya " + nama + (usaha ? " dari " + usaha : "") + ".",
        "Jenis usaha: " + jenis,
        "Yang saya butuhkan: " + (paket ? paket.value : "Belum tahu, mohon disarankan")
      ];
      if (catatan) { lines.push("Catatan: " + catatan); }
      lines.push("", "Mohon kirim contoh website yang sesuai dengan usaha saya.");
      window.open(waUrl(lines.join("\n")), "_blank", "noopener");
    });
  }
})();
