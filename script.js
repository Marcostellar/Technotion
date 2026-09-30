const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.site-header');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

const form = document.getElementById('joinForm');
const message = document.getElementById('formMessage');
const toast = document.getElementById('toast');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  if (!name) return;
  message.textContent = `Thanks, ${name}! Your interest has been recorded for this demo.`;
  form.reset();
  showToast('Welcome to TechNotion ✦');
});

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

const revealItems = document.querySelectorAll('.pillar, .program-card, .event-card, .project-card, .process-step');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(18px)';
  item.style.transition = 'opacity .55s ease, transform .55s ease';
  observer.observe(item);
});

function animateCount(el) {
  const target = Number(el.dataset.count || 0);
  const duration = 1100;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const stats = document.querySelectorAll('[data-count]');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
stats.forEach(stat => statsObserver.observe(stat));

const visual = document.querySelector('.hero-visual');
if (visual && window.matchMedia('(pointer:fine)').matches) {
  visual.addEventListener('mousemove', (e) => {
    const r = visual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const windowEl = visual.querySelector('.code-window');
    if (windowEl) windowEl.style.transform = `rotate(-2deg) translate(${x * 10}px, ${y * 8}px)`;
  });
}
