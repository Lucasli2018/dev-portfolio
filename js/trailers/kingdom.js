/* ============================================================
 * dev-portfolio · 脚本模块
 * 王国守卫预告片
 * ------------------------------------------------------------
 * 由 index.html 内联代码拆分而来，内容未做改写。
 * ============================================================ */
/* --- Kingdom Defense Game Trailer --- */
function startKingdomDefenseTrailer() {
  const ctx = trailerCtx;
  const W = trailerCanvas.width;
  const H = trailerCanvas.height;

  let time = 0;
  let gold = 200;
  let lives = 20;
  let wave = 1;

  // Path waypoints (S-curve)
  const path = [
    {x: -20, y: H * 0.3},
    {x: W * 0.25, y: H * 0.3},
    {x: W * 0.25, y: H * 0.7},
    {x: W * 0.5, y: H * 0.7},
    {x: W * 0.5, y: H * 0.25},
    {x: W * 0.75, y: H * 0.25},
    {x: W * 0.75, y: H * 0.65},
    {x: W + 20, y: H * 0.65}
  ];

  // Towers
  const towers = [
    {x: W * 0.18, y: H * 0.45, type: 0, range: 80, cd: 0, color: '#8D5524'},
    {x: W * 0.38, y: H * 0.5, type: 1, range: 90, cd: 0, color: '#7B1FA2'},
    {x: W * 0.62, y: H * 0.45, type: 0, range: 80, cd: 0, color: '#8D5524'},
    {x: W * 0.82, y: H * 0.45, type: 2, range: 100, cd: 0, color: '#1565C0'}
  ];

  const enemies = [];
  const projectiles = [];
  const particles = [];

  function getPathPos(t) {
    const totalSegs = path.length - 1;
    const segLen = 1 / totalSegs;
    const seg = Math.min(Math.floor(t / segLen), totalSegs - 1);
    const localT = (t - seg * segLen) / segLen;
    return {
      x: path[seg].x + (path[seg+1].x - path[seg].x) * localT,
      y: path[seg].y + (path[seg+1].y - path[seg].y) * localT
    };
  }

  function drawScene() {
    // Background grass
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#2D5A3D');
    bgGrad.addColorStop(1, '#1B3A2F');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Grid texture
    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Trees decoration
    for (let i = 0; i < 8; i++) {
      const tx = (i * 137 + 50) % W;
      const ty = (i * 89 + 20) % H;
      ctx.fillStyle = '#1B5E20';
      ctx.beginPath();
      ctx.arc(tx, ty, 8, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = '#388E3C';
      ctx.beginPath();
      ctx.arc(tx-3, ty-3, 6, 0, Math.PI*2);
      ctx.fill();
    }

    // Draw path (stone road)
    ctx.strokeStyle = '#8D8D8D';
    ctx.lineWidth = 28;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();

    // Path border
    ctx.strokeStyle = '#6D6D6D';
    ctx.lineWidth = 32;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Castle (end of path)
    const castle = path[path.length - 1];
    ctx.save();
    ctx.translate(castle.x - 30, castle.y);
    ctx.fillStyle = '#757575';
    ctx.fillRect(-20, -25, 40, 50);
    ctx.fillStyle = '#B71C1C';
    ctx.beginPath();
    ctx.moveTo(-22, -25); ctx.lineTo(-10, -35); ctx.lineTo(0, -25);
    ctx.moveTo(0, -25); ctx.lineTo(10, -35); ctx.lineTo(22, -25);
    ctx.fill();
    ctx.fillStyle = '#424242';
    ctx.fillRect(-6, -5, 12, 12);
    ctx.restore();

    // Spawn enemies
    if (time % 80 === 0 && enemies.length < 8) {
      const types = [
        {hp: 3, speed: 0.0025, r: 10, color: '#E53935', gold: 15},
        {hp: 6, speed: 0.0018, r: 14, color: '#7B1FA2', gold: 25},
        {hp: 2, speed: 0.0035, r: 8, color: '#FF9800', gold: 10}
      ];
      const t = types[Math.floor(Math.random() * types.length)];
      enemies.push({
        progress: 0,
        hp: t.hp,
        maxHp: t.hp,
        speed: t.speed,
        r: t.r,
        color: t.color,
        gold: t.gold
      });
    }

    // Update & draw enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      e.progress += e.speed;
      const pos = getPathPos(Math.min(e.progress, 0.99));

      if (e.progress >= 1) {
        lives--;
        enemies.splice(i, 1);
        continue;
      }

      // Draw enemy
      ctx.save();
      ctx.translate(pos.x, pos.y);
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(0, e.r * 0.7, e.r * 0.8, e.r * 0.3, 0, 0, Math.PI*2);
      ctx.fill();
      // Body
      ctx.fillStyle = e.color;
      ctx.beginPath();
      ctx.arc(0, 0, e.r, 0, Math.PI*2);
      ctx.fill();
      // Eyes
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(-e.r*0.3, -e.r*0.15, e.r*0.2, 0, Math.PI*2);
      ctx.arc(e.r*0.3, -e.r*0.15, e.r*0.2, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(-e.r*0.25, -e.r*0.15, e.r*0.1, 0, Math.PI*2);
      ctx.arc(e.r*0.25, -e.r*0.15, e.r*0.1, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();

      // HP bar
      const barW = e.r * 2;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(pos.x - barW/2, pos.y - e.r - 8, barW, 3);
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(pos.x - barW/2, pos.y - e.r - 8, barW * (e.hp / e.maxHp), 3);
    }

    // Draw towers & fire
    towers.forEach(tw => {
      // Find nearest enemy in range
      let target = null;
      let minDist = tw.range;
      enemies.forEach(e => {
        const pos = getPathPos(Math.min(e.progress, 0.99));
        const d = Math.sqrt((pos.x - tw.x)**2 + (pos.y - tw.y)**2);
        if (d < minDist) {
          minDist = d;
          target = pos;
        }
      });

      // Draw range circle (faint)
      if (target) {
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(tw.x, tw.y, tw.range, 0, Math.PI*2);
        ctx.stroke();
      }

      // Fire
      if (target && tw.cd <= 0) {
        const angle = Math.atan2(target.y - tw.y, target.x - tw.x);
        projectiles.push({
          x: tw.x, y: tw.y,
          vx: Math.cos(angle) * 6,
          vy: Math.sin(angle) * 6,
          color: ['#FFD54F', '#CE93D8', '#64B5F6'][tw.type],
          r: 4,
          damage: [1, 1.5, 1][tw.type]
        });
        tw.cd = [25, 40, 20][tw.type];
      }
      tw.cd--;

      // Draw tower
      ctx.save();
      ctx.translate(tw.x, tw.y);
      // Base shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(0, 12, 16, 5, 0, 0, Math.PI*2);
      ctx.fill();
      // Base
      ctx.fillStyle = '#5D4037';
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI*2);
      ctx.fill();
      // Tower body
      ctx.fillStyle = tw.color;
      ctx.fillRect(-8, -20, 16, 20);
      // Top
      ctx.fillStyle = '#3E2723';
      ctx.beginPath();
      ctx.moveTo(-10, -20); ctx.lineTo(0, -28); ctx.lineTo(10, -20);
      ctx.fill();
      // Crystal/eye
      ctx.fillStyle = ['#FFD54F', '#CE93D8', '#64B5F6'][tw.type];
      ctx.shadowBlur = 8;
      ctx.shadowColor = ctx.fillStyle;
      ctx.beginPath();
      ctx.arc(0, -12, 4, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    });

    // Update & draw projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Trail
      ctx.fillStyle = p.color + '60';
      ctx.beginPath();
      ctx.arc(p.x - p.vx, p.y - p.vy, p.r * 0.7, 0, Math.PI*2);
      ctx.fill();

      // Bullet
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Hit detection
      let hit = false;
      for (let j = enemies.length - 1; j >= 0; j--) {
        const e = enemies[j];
        const pos = getPathPos(Math.min(e.progress, 0.99));
        const d = Math.sqrt((p.x - pos.x)**2 + (p.y - pos.y)**2);
        if (d < e.r + p.r) {
          e.hp -= p.damage;
          hit = true;
          // Hit particles
          for (let k = 0; k < 4; k++) {
            particles.push({
              x: pos.x, y: pos.y,
              vx: (Math.random()-0.5)*4,
              vy: (Math.random()-0.5)*4,
              life: 20, color: p.color
            });
          }
          if (e.hp <= 0) {
            gold += e.gold;
            // Death explosion
            for (let k = 0; k < 8; k++) {
              particles.push({
                x: pos.x, y: pos.y,
                vx: (Math.random()-0.5)*6,
                vy: (Math.random()-0.5)*6,
                life: 30, color: e.color
              });
            }
            enemies.splice(j, 1);
          }
          break;
        }
      }

      if (hit || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
        projectiles.splice(i, 1);
      }
    }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life--;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 30;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI*2);
      ctx.fill();
      ctx.globalAlpha = 1;
      if (p.life <= 0) particles.splice(i, 1);
    }

    // Wave counter
    if (time > 0 && time % 400 === 0) wave++;

    // HUD
    const isCyberHUD3 = document.documentElement.getAttribute('data-theme') === 'cyberpunk';
    const hudColor = isCyberHUD3 ? 'rgba(164, 230, 57, 0.9)' : 'rgba(255, 255, 255, 0.85)';
    ctx.fillStyle = hudColor;
    ctx.font = '600 14px Inter, sans-serif';
    ctx.fillText(`💰 ${gold}  ❤️ ${lives}  🌊 Wave ${wave}  🏰 Kingdom Defense`, 20, 30);

    time++;
    trailerAnim = requestAnimationFrame(drawScene);
  }

  drawScene();
}
