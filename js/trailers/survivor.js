/* ============================================================
 * dev-portfolio · 脚本模块
 * 暗夜幸存者预告片
 * ------------------------------------------------------------
 * 由 index.html 内联代码拆分而来，内容未做改写。
 * ============================================================ */
/* --- Survivor Game Trailer --- */
function startSurvivorTrailer() {
  const ctx = trailerCtx;
  const W = trailerCanvas.width;
  const H = trailerCanvas.height;
  
  let time = 0;
  const enemies = [];
  const projectiles = [];
  
  // Spawn enemies
  for (let i = 0; i < 30; i++) {
    enemies.push({
      x: Math.random() * W,
      y: Math.random() * H,
      type: Math.floor(Math.random() * 4),
      r: 12 + Math.random() * 6,
      speed: 0.5 + Math.random() * 0.8,
      hp: 1
    });
  }
  
  const player = { x: W / 2, y: H / 2, r: 16 };
  
  function drawScene() {
    // Dark background
    const bgGrad = ctx.createRadialGradient(W/2, H/2, 50, W/2, H/2, W);
    bgGrad.addColorStop(0, '#1a1a2e');
    bgGrad.addColorStop(1, '#0a0a1a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);
    
    // Grid
    ctx.strokeStyle = 'rgba(255,107,71,0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    
    // Move player in a circle
    player.x = W/2 + Math.cos(time * 0.02) * 100;
    player.y = H/2 + Math.sin(time * 0.02) * 80;
    
    // Draw enemies
    enemies.forEach((e, i) => {
      const dx = player.x - e.x;
      const dy = player.y - e.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      e.x += (dx / dist) * e.speed;
      e.y += (dy / dist) * e.speed;
      
      // Draw enemy (simplified cartoon)
      ctx.save();
      ctx.translate(e.x, e.y);
      
      const colors = ['#4CAF50', '#9C27B0', '#E0E0E0', '#FF7043'];
      const c = colors[e.type];
      
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(0, e.r * 0.8, e.r * 0.8, e.r * 0.3, 0, 0, Math.PI*2);
      ctx.fill();
      
      // Body
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(0, 0, e.r, 0, Math.PI*2);
      ctx.fill();
      
      // Eyes
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(-e.r*0.3, -e.r*0.2, e.r*0.2, 0, Math.PI*2);
      ctx.arc(e.r*0.3, -e.r*0.2, e.r*0.2, 0, Math.PI*2);
      ctx.fill();
      
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(-e.r*0.3, -e.r*0.2, e.r*0.1, 0, Math.PI*2);
      ctx.arc(e.r*0.3, -e.r*0.2, e.r*0.1, 0, Math.PI*2);
      ctx.fill();
      
      ctx.restore();
      
      // Auto-fire at nearby enemies
      if (time % 30 === 0 && dist < 200) {
        projectiles.push({
          x: player.x, y: player.y,
          vx: (dx/dist) * 5, vy: (dy/dist) * 5,
          r: 5
        });
      }
    });
    
    // Draw projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      // Trail
      ctx.fillStyle = 'rgba(255, 107, 71, 0.3)';
      ctx.beginPath();
      ctx.arc(p.x - p.vx*2, p.y - p.vy*2, p.r * 0.6, 0, Math.PI*2);
      ctx.fill();
      
      // Bullet
      ctx.fillStyle = '#FF6B47';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FF6B47';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Check collision
      let hit = false;
      enemies.forEach((e, ei) => {
        const ddx = p.x - e.x;
        const ddy = p.y - e.y;
        if (Math.sqrt(ddx*ddx + ddy*ddy) < e.r + p.r) {
          hit = true;
          // Respawn enemy
          e.x = Math.random() * W;
          e.y = Math.random() * H;
          
          // Explosion particles
          ctx.fillStyle = 'rgba(255, 200, 100, 0.6)';
          for (let k = 0; k < 5; k++) {
            ctx.beginPath();
            ctx.arc(e.x + (Math.random()-0.5)*20, e.y + (Math.random()-0.5)*20, 3, 0, Math.PI*2);
            ctx.fill();
          }
        }
      });
      
      if (hit || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
        projectiles.splice(i, 1);
      }
    }
    
    // Draw player (blue-clothed hero)
    ctx.save();
    ctx.translate(player.x, player.y);
    
    // Aura
    const auraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 50);
    auraGrad.addColorStop(0, 'rgba(100, 150, 255, 0.15)');
    auraGrad.addColorStop(1, 'rgba(100, 150, 255, 0)');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI*2);
    ctx.fill();
    
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(0, player.r * 0.8, player.r * 0.8, player.r * 0.3, 0, 0, Math.PI*2);
    ctx.fill();
    
    // Body (blue)
    ctx.fillStyle = '#2196F3';
    ctx.beginPath();
    ctx.arc(0, 0, player.r, 0, Math.PI*2);
    ctx.fill();
    
    // Head (big head, skin tone)
    ctx.fillStyle = '#FFCC80';
    ctx.beginPath();
    ctx.arc(0, -player.r*0.1, player.r*0.85, 0, Math.PI*2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-player.r*0.3, -player.r*0.2, player.r*0.22, 0, Math.PI*2);
    ctx.arc(player.r*0.3, -player.r*0.2, player.r*0.22, 0, Math.PI*2);
    ctx.fill();
    
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(-player.r*0.3, -player.r*0.2, player.r*0.12, 0, Math.PI*2);
    ctx.arc(player.r*0.3, -player.r*0.2, player.r*0.12, 0, Math.PI*2);
    ctx.fill();
    
    // Smile
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, player.r*0.2, player.r*0.25, 0, Math.PI);
    ctx.stroke();
    
    ctx.restore();
    
    // HUD
    const isCyberHUD = document.documentElement.getAttribute('data-theme') === 'cyberpunk';
    ctx.fillStyle = isCyberHUD ? 'rgba(164, 230, 57, 0.9)' : 'rgba(255, 255, 255, 0.8)';
    ctx.font = '600 14px Inter, sans-serif';
    ctx.fillText(`⚔️ Weapons: 3 | 🏆 Level ${Math.floor(time/60)+1} | ⏱️ ${Math.floor(time/10)}s`, 20, 30);
    
    time++;
    trailerAnim = requestAnimationFrame(drawScene);
  }
  
  drawScene();
}
