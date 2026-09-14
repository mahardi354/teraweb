// AMARA Dental Studio — shared behavior

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      toggle.classList.toggle("active");
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    if (!q) return;
    q.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      item.closest(".faq-list")
        .querySelectorAll(".faq-item")
        .forEach((el) => el.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Contact form (demo only — no backend)
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const original = btn.textContent;
      btn.textContent = "Pesan terkirim ✓";
      btn.style.background = "#3E8677";
      form.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = "";
      }, 2800);
    });
  }

  // Set active nav link based on current page
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
});
