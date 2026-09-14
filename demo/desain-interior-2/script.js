// ===== Header transparent -> solid on scroll =====
const header = document.querySelector('.site-header');
function handleHeaderScroll(){
  if(window.scrollY > 40){ header.classList.add('scrolled'); }
  else{ header.classList.remove('scrolled'); }
}
window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll();

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if(navToggle){
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mainNav.classList.toggle('mobile-open');
  });
  mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mainNav.classList.remove('mobile-open');
  }));
}

// ===== FAQ accordion: buka tutup bergantian (satu terbuka dalam satu waktu) =====
document.querySelectorAll('.faq-list').forEach(list => {
  const items = list.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if(!isOpen){
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
  // buka item pertama secara default
  if(items[0]){
    items[0].classList.add('open');
    const firstAnswer = items[0].querySelector('.faq-answer');
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));
