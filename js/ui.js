/* ============================================================
 * dev-portfolio · 脚本模块
 * 主题切换、导航交互、滚动显现
 * ------------------------------------------------------------
 * 由 index.html 内联代码拆分而来，内容未做改写。
 * ============================================================ */
/* ==================== Theme Toggle ==================== */
let currentTheme = localStorage.getItem('portfolio-theme') || 'coral';

function applyTheme(theme) {
  currentTheme = theme;
  const root = document.documentElement;
  const icon = document.getElementById('themeIcon');
  const toggle = document.getElementById('themeToggle');
  
  if (theme === 'cyberpunk') {
    root.setAttribute('data-theme', 'cyberpunk');
    if (icon) icon.textContent = '☀️';
    if (toggle) toggle.title = '切换到珊瑚橙主题';
  } else {
    root.removeAttribute('data-theme');
    if (icon) icon.textContent = '🌙';
    if (toggle) toggle.title = '切换到赛博朋克主题';
  }
  
  localStorage.setItem('portfolio-theme', theme);
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    applyTheme(currentTheme === 'cyberpunk' ? 'coral' : 'cyberpunk');
  });
}

applyTheme(currentTheme);

/* ==================== Navigation ==================== */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
});

/* ==================== Scroll Reveal ==================== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  observer.observe(el);
});
