// Scroll suave para links âncora
function smoothScrollTo(target) {
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY - 70;
  const distance = end - start;
  const duration = 900;
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      smoothScrollTo(target);
    }
  });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Fechar menu ao clicar em link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// EmailJS
emailjs.init('CzsMkjAWuaKpDLFOq');

const form = document.getElementById('contato-form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  emailjs.sendForm('service_muzp8be', 'template_19byl4v', form)
    .then(() => {
      btn.textContent = 'Mensagem Enviada!';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Enviar Mensagem';
        btn.disabled = false;
      }, 3000);
    })
    .catch((err) => {
      console.error('EmailJS erro:', JSON.stringify(err));
      btn.textContent = 'Erro: ' + (err.text || err.status || 'verifique o console');
      btn.disabled = false;
    });
});

// Botão flutuante WhatsApp
const waBtn = document.createElement('a');
waBtn.href = 'https://wa.me/5531972361975';
waBtn.target = '_blank';
waBtn.className = 'wa-float';
waBtn.innerHTML = '💬';
waBtn.setAttribute('aria-label', 'WhatsApp');
document.body.appendChild(waBtn);
