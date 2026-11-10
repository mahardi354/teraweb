/* TeraWeb.id — JavaScript ringan (tanpa library).
   Nomor WhatsApp: format internasional, tanpa + dan tanpa spasi. */
(function () {
  "use strict";

  var CONFIG = { wa: "6285227272999" };
  var waReady = /^\d{9,15}$/.test(CONFIG.wa);
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  function waUrl(message) {
    return "https://wa.me/" + CONFIG.wa + "?text=" + encodeURIComponent(message);
  }

  // Tautan dengan atribut data-wa dibuka ke WhatsApp dengan pesan siap kirim.
  if (waReady) {
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = waUrl(a.getAttribute("data-wa"));
      a.target = "_blank";
      a.rel = "noopener";
    });
  } else if (window.console) {
    console.warn("TeraWeb.id: nomor WhatsApp belum diatur. Edit CONFIG.wa di assets/app.js.");
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

  // FAQ: buka satu, tutup yang lain
  document.querySelectorAll(".faq").forEach(function (group) {
    var items = group.querySelectorAll("details");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) { items.forEach(function (o) { if (o !== item) { o.open = false; } }); }
      });
    });
  });

  // Tahun di footer
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Animasi bar (lomba muat dan simulasi biaya): jalan sekali saat terlihat
  function runWhenVisible(el) {
    if (reduce || !("IntersectionObserver" in window)) { el.classList.add("is-run"); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { el.classList.add("is-run"); io.disconnect(); }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  }
  document.querySelectorAll(".race, .cost__bars").forEach(runWhenVisible);

  // Putar ulang lomba muat. Memakai Web Animations API (bukan class CSS) supaya tetap
  // berjalan di perangkat dengan pengaturan "kurangi gerakan": ini permintaan pengunjung sendiri.
  var replay = document.getElementById("race-replay");
  var race = document.querySelector(".race");
  if (replay && race) {
    var lanes = [
      { sel: ".race__row--slow .race__fill", ms: 3400, ease: "cubic-bezier(.3,.1,.5,1)" },
      { sel: ".race__row--fast .race__fill", ms: 500, ease: "cubic-bezier(.3,.9,.3,1)" }
    ];
    replay.addEventListener("click", function () {
      lanes.forEach(function (lane) {
        var fill = race.querySelector(lane.sel);
        if (!fill || !fill.animate) { return; }
        fill.getAnimations().forEach(function (an) { an.cancel(); });
        var track = fill.parentNode.getBoundingClientRect().width;
        var pct = track ? (fill.getBoundingClientRect().width / track) * 100 : 100;
        fill.animate([{ width: "0%" }, { width: pct + "%" }], { duration: lane.ms, easing: lane.ease });
      });
    });
  }

  // Formulir kontak: susun pesan lalu buka WhatsApp
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
        "Halo TeraWeb.id, saya " + nama + (usaha ? " dari " + usaha : "") + ".",
        "Jenis usaha: " + jenis,
        "Yang saya butuhkan: " + (paket ? paket.value : "Belum tahu, mohon disarankan")
      ];
      if (catatan) { lines.push("Catatan: " + catatan); }
      lines.push("", "Mohon kirim contoh website yang sesuai dengan usaha saya.");
      window.open(waUrl(lines.join("\n")), "_blank", "noopener");
    });
  }
})();
