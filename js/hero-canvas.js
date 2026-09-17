/* ============================================================
 * dev-portfolio · 脚本模块
 * Hero 粒子背景动画
 * ------------------------------------------------------------
 * 由 index.html 内联代码拆分而来，内容未做改写。
 * ============================================================ */
/* ==================== Hero Background Canvas ==================== */
const heroCanvas = document.getElementById('heroCanvas');
const heroCtx = heroCanvas.getContext('2d');
let heroW, heroH, heroParticles = [];

function resizeHeroCanvas() {
  heroW = heroCanvas.width = heroCanvas.offsetWidth;
  heroH = heroCanvas.height = heroCanvas.offsetHeight;
  heroParticles = [];
  const count = Math.floor((heroW * heroH) / 18000);
  for (let i = 0; i < count; i++) {
    heroParticles.push({
      x: Math.random() * heroW,
      y: Math.random() * heroH,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 3 + 1,
      a: Math.random() * 0.15 + 0.05,
      hue: Math.random() > 0.5 ? 16 : 200
    });
  }
}

function drawHeroBg() {
  heroCtx.clearRect(0, 0, heroW, heroH);
  
  const isCyber = document.documentElement.getAttribute('data-theme') === 'cyberpunk';
  
  // Gradient background
  const grad = heroCtx.createRadialGradient(heroW * 0.3, heroH * 0.4, 0, heroW * 0.5, heroH * 0.5, heroW * 0.8);
  if (isCyber) {
    grad.addColorStop(0, 'rgba(34, 30, 24, 1)');
    grad.addColorStop(0.5, 'rgba(24, 21, 18, 0.9)');
    grad.addColorStop(1, 'rgba(20, 17, 13, 1)');
  } else {
    grad.addColorStop(0, 'rgba(255, 248, 245, 1)');
    grad.addColorStop(0.5, 'rgba(255, 240, 232, 0.8)');
    grad.addColorStop(1, 'rgba(255, 248, 245, 1)');
  }
  heroCtx.fillStyle = grad;
  heroCtx.fillRect(0, 0, heroW, heroH);
  
  // Floating particles
  heroParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = heroW;
    if (p.x > heroW) p.x = 0;
    if (p.y < 0) p.y = heroH;
    if (p.y > heroH) p.y = 0;
    
    heroCtx.beginPath();
    heroCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    if (isCyber) {
      heroCtx.fillStyle = p.hue === 16
        ? `rgba(164, 230, 57, ${p.a * 1.5})`
        : `rgba(240, 90, 40, ${p.a})`;
    } else {
      if (p.hue === 16) {
        heroCtx.fillStyle = `rgba(255, 107, 71, ${p.a})`;
      } else {
        heroCtx.fillStyle = `rgba(135, 169, 107, ${p.a * 0.6})`;
      }
    }
    heroCtx.fill();
  });
  
  // Connecting lines
  const lineColor = isCyber ? '164, 230, 57' : '255, 107, 71';
  for (let i = 0; i < heroParticles.length; i++) {
    for (let j = i + 1; j < heroParticles.length; j++) {
      const dx = heroParticles[i].x - heroParticles[j].x;
      const dy = heroParticles[i].y - heroParticles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        heroCtx.beginPath();
        heroCtx.moveTo(heroParticles[i].x, heroParticles[i].y);
        heroCtx.lineTo(heroParticles[j].x, heroParticles[j].y);
        heroCtx.strokeStyle = `rgba(${lineColor}, ${0.08 * (1 - dist / 120)})`;
        heroCtx.lineWidth = 1;
        heroCtx.stroke();
      }
    }
  }
  
  requestAnimationFrame(drawHeroBg);
}

resizeHeroCanvas();
drawHeroBg();
window.addEventListener('resize', resizeHeroCanvas);
