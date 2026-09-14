// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if(navToggle){
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click', ()=> navLinks.classList.remove('show'));
  });
}

// ===== FAQ accordion (alternating open/close, one at a time) =====
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    // close all siblings within the same faq-list
    const list = item.closest('.faq-list');
    list.querySelectorAll('.faq-item.open').forEach(openItem=>{
      if(openItem !== item){
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
      }
    });
    if(isOpen){
      item.classList.remove('open');
      a.style.maxHeight = null;
    }else{
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});
// open first FAQ by default
const firstFaq = document.querySelector('.faq-list .faq-item');
if(firstFaq){
  firstFaq.classList.add('open');
  firstFaq.querySelector('.faq-a').style.maxHeight = firstFaq.querySelector('.faq-a').scrollHeight + 'px';
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
},{ threshold:.15 });
revealEls.forEach(el=> io.observe(el));

// ===== Sticky navbar shadow + back to top =====
const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', ()=>{
  if(backTop){
    if(window.scrollY > 500) backTop.classList.add('show');
    else backTop.classList.remove('show');
  }
});
if(backTop){
  backTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
}

// ===== Contact form (demo only) =====
const contactForm = document.querySelector('#contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Pesan Terkirim ✓';
    btn.style.background = '#16544A';
    setTimeout(()=>{ btn.textContent = original; btn.style.background = ''; contactForm.reset(); }, 2600);
  });
}
