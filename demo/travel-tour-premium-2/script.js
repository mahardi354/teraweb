// VELA Journeys — shared interactions

document.addEventListener('DOMContentLoaded', () => {

  /* Header scroll state */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
    else{ header.classList.remove('is-scrolled'); }
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if(navToggle){
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('is-open');
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mainNav.classList.remove('is-open'));
    });
  }

  /* FAQ accordion — bergantian (one open at a time) */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      faqItems.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* Destination filter tabs */
  const tagBtns = document.querySelectorAll('.tag-btn[data-filter]');
  const filterCards = document.querySelectorAll('[data-category]');
  if(tagBtns.length){
    tagBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tagBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;
        filterCards.forEach(card => {
          if(filter === 'semua' || card.dataset.category === filter){
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* Contact form — prevent real submit, show confirmation */
  const contactForm = document.querySelector('.contact-form form');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Terkirim! Kami akan segera menghubungi Anda';
      contactForm.reset();
      setTimeout(() => { btn.textContent = original; }, 3200);
    });
  }

  /* Newsletter form in footer */
  const newsletterForm = document.querySelector('.footer-newsletter form');
  if(newsletterForm){
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      input.value = 'Terima kasih telah berlangganan!';
      newsletterForm.reset();
    });
  }

});
