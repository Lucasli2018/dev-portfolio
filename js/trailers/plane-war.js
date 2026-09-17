/* ============================================================
 * dev-portfolio · 脚本模块
 * 飞机大战预告片
 * ------------------------------------------------------------
 * 由 index.html 内联代码拆分而来，内容未做改写。
 * ============================================================ */
/* --- Plane War Game Trailer --- */
function startPlaneWarTrailer() {
  const ctx = trailerCtx;
  const W = trailerCanvas.width;
  const H = trailerCanvas.height;
  
  let time = 0;
  const bullets = [];
  const enemies = [];
  const particles = [];
  let player = { x: W/2, y: H - 80, w: 40, h: 40 };
  
  // Stars
  const stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({ x: Math.random()*W, y: Math.random()*H, s: Math.random()*2, v: 0.5+Math.random()*2 });
  }
  
  function drawScene() {
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
    skyGrad.addColorStop(0, '#0a1628');
    skyGrad.addColorStop(0.5, '#1a3a5c');
    skyGrad.addColorStop(1, '#2a5a8c');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);
    
    // Stars
    stars.forEach(s => {
      s.y += s.v;
      if (s.y > H) { s.y = 0; s.x = Math.random()*W; }
      ctx.fillStyle = `rgba(255,255,255,${0.3 + s.s * 0.3})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.s, 0, Math.PI*2);
      ctx.fill();
    });
    
    // Spawn enemies
    if (time % 40 === 0) {
      enemies.push({
        x: Math.random() * (W - 60) + 30,
        y: -30,
        type: Math.floor(Math.random() * 3),
        hp: 1 + Math.floor(Math.random() * 2)
      });
    }
    
    // Player movement
    player.x = W/2 + Math.sin(time * 0.03) * 150;
    
    // Auto fire
    if (time % 12 === 0) {
      bullets.push({ x: player.x - 8, y: player.y - 20, vy: -8, type: 'player' });
      bullets.push({ x: player.x + 8, y: player.y - 20, vy: -8, type: 'player' });
    }
    
    // Draw player plane
    ctx.save();
    ctx.translate(player.x, player.y);
    
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(0, 25, 20, 6, 0, 0, Math.PI*2);
    ctx.fill();
    
    // Body
    ctx.fillStyle = '#FF6B47';
    ctx.beginPath();
    ctx.moveTo(0, -25);
    ctx.lineTo(-20, 15);
    ctx.lineTo(-10, 10);
    ctx.lineTo(-15, 20);
    ctx.lineTo(0, 15);
    ctx.lineTo(15, 20);
    ctx.lineTo(10, 10);
    ctx.lineTo(20, 15);
    ctx.closePath();
    ctx.fill();
    
    // Cockpit
    ctx.fillStyle = '#FFD54F';
    ctx.beginPath();
    ctx.arc(0, -5, 6, 0, Math.PI*2);
    ctx.fill();
    
    // Engine flame
    ctx.fillStyle = 'rgba(255, 200, 0, 0.6)';
    ctx.beginPath();
    ctx.moveTo(-4, 18);
    ctx.lineTo(0, 25 + Math.sin(time * 0.5) * 4);
    ctx.lineTo(4, 18);
    ctx.fill();
    
    ctx.restore();
    
    // Update & draw bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.y += b.vy;
      
      if (b.type === 'player') {
        // Player bullet
        ctx.fillStyle = '#FFD54F';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#FFD54F';
        ctx.fillRect(b.x - 2, b.y - 8, 4, 12);
        ctx.shadowBlur = 0;
      } else {
        // Enemy bullet
        ctx.fillStyle = '#FF5252';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI*2);
        ctx.fill();
      }
      
      // Remove off-screen
      if (b.y < -20 || b.y > H + 20) {
        bullets.splice(i, 1);
        continue;
      }
      
      // Check collisions
      if (b.type === 'player') {
        for (let j = enemies.length - 1; j >= 0; j--) {
          const e = enemies[j];
          if (Math.abs(b.x - e.x) < 20 && Math.abs(b.y - e.y) < 20) {
            e.hp--;
            if (e.hp <= 0) {
              // Explosion
              for (let k = 0; k < 8; k++) {
                particles.push({
                  x: e.x, y: e.y,
                  vx: (Math.random()-0.5)*6,
                  vy: (Math.random()-0.5)*6,
                  life: 30,
                  color: ['#FF6B47', '#FFD54F', '#FF5252'][Math.floor(Math.random()*3)]
                });
              }
              enemies.splice(j, 1);
            }
            bullets.splice(i, 1);
            break;
          }
        }
      }
    }
    
    // Update & draw enemies
    enemies.forEach(e => {
      e.y += 1.5;
      
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(Math.PI);
      
      const colors = ['#9C27B0', '#4CAF50', '#FF9800'];
      const c = colors[e.type];
      
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(-15, 10);
      ctx.lineTo(0, 5);
      ctx.lineTo(15, 10);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(0, -5, 4, 0, Math.PI*2);
      ctx.fill();
      
      ctx.restore();
    });
    
    // Remove off-screen enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      if (enemies[i].y > H + 30) enemies.splice(i, 1);
    }
    
    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 30;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
      ctx.fill();
      ctx.globalAlpha = 1;
      
      if (p.life <= 0) particles.splice(i, 1);
    }
    
    // HUD
    const isCyberHUD2 = document.documentElement.getAttribute('data-theme') === 'cyberpunk';
    ctx.fillStyle = isCyberHUD2 ? 'rgba(164, 230, 57, 0.9)' : 'rgba(255, 255, 255, 0.8)';
    ctx.font = '600 14px Inter, sans-serif';
    ctx.fillText(`🏆 Score: ${time * 10} | ❤️ x3 | 🎯 Level ${Math.floor(time/200)+1}`, 20, 30);
    
    time++;
    trailerAnim = requestAnimationFrame(drawScene);
  }
  
  drawScene();
}
