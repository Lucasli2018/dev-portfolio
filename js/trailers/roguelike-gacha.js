/* ============================================================
 * dev-portfolio · 脚本模块
 * 星海抽卡者预告片
 * ------------------------------------------------------------
 * 由 index.html 内联代码拆分而来，内容未做改写。
 * ============================================================ */
/* --- Star-Sea Gacha Trailer --- */
function startRoguelikeGachaTrailer() {
  const ctx = trailerCtx;
  const W = trailerCanvas.width;
  const H = trailerCanvas.height;
  let time = 0;

  const stars = [];
  for (let i = 0; i < 120; i++) {
    stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.3, p: Math.random() * Math.PI * 2 });
  }
  const units = [];
  const cols = ['#5ad1ff', '#b388ff', '#ffd166', '#7CFC9B', '#ff8aa0'];
  let spawnTimer = 0;

  function spawnUnit() {
    units.push({
      x: W / 2 + (Math.random() - 0.5) * 40,
      y: H * 0.62,
      vy: -(1.2 + Math.random() * 1.5),
      r: 14 + Math.random() * 10,
      col: cols[Math.floor(Math.random() * cols.length)],
      life: 0,
      spin: Math.random() * Math.PI
    });
  }

  function draw() {
    const bg = ctx.createRadialGradient(W / 2, H * 0.55, 20, W / 2, H * 0.55, W * 0.7);
    bg.addColorStop(0, '#241a52');
    bg.addColorStop(1, '#06040f');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // 星点
    stars.forEach(s => {
      const a = 0.3 + 0.7 * Math.abs(Math.sin(time * 0.04 + s.p));
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });

    // 中央抽卡传送门（旋转环）
    const cx = W / 2, cy = H * 0.55;
    for (let k = 0; k < 3; k++) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.01 * (k + 1) * (k % 2 ? -1 : 1));
      ctx.strokeStyle = k % 2 ? 'rgba(255,138,76,0.6)' : 'rgba(120,180,255,0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 2; a += 0.2) {
        const rr = 50 + k * 22 + Math.sin(a * 3 + time * 0.05) * 6;
        const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
        if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.stroke();
      ctx.restore();
    }
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
    core.addColorStop(0, 'rgba(255,210,140,0.9)');
    core.addColorStop(1, 'rgba(255,138,76,0)');
    ctx.fillStyle = core; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fill();

    // 生成星舰单位
    spawnTimer++;
    if (spawnTimer > 70 && units.length < 8) { spawnUnit(); spawnTimer = 0; }

    for (let i = units.length - 1; i >= 0; i--) {
      const u = units[i];
      u.y += u.vy; u.life++; u.spin += 0.05;
      const alpha = Math.max(0, 1 - u.life / 180);
      if (u.life > 180) { units.splice(i, 1); continue; }
      const g = ctx.createRadialGradient(u.x, u.y, 0, u.x, u.y, u.r * 2.2);
      g.addColorStop(0, u.col);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = alpha * 0.6;
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(u.x, u.y, u.r * 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = alpha;
      ctx.save(); ctx.translate(u.x, u.y); ctx.rotate(u.spin);
      ctx.fillStyle = u.col;
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = -Math.PI / 2 + a * 2 * Math.PI / 5;
        const x = Math.cos(ang) * u.r, y = Math.sin(ang) * u.r;
        if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        const ang2 = ang + Math.PI / 5;
        ctx.lineTo(Math.cos(ang2) * u.r * 0.45, Math.sin(ang2) * u.r * 0.45);
      }
      ctx.closePath(); ctx.fill();
      ctx.restore();
      ctx.globalAlpha = 1;
      if (u.life % 10 < 2) {
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath(); ctx.arc(u.x + u.r, u.y - u.r, 2, 0, Math.PI * 2); ctx.fill();
      }
    }

    // HUD
    const cyber = document.documentElement.getAttribute('data-theme') === 'cyberpunk';
    ctx.fillStyle = cyber ? 'rgba(164,230,57,0.9)' : 'rgba(255,255,255,0.85)';
    ctx.font = '600 14px Inter, sans-serif';
    ctx.fillText('🌠 星海抽卡者 · 星海抽卡', 20, 30);

    time++;
    trailerAnim = requestAnimationFrame(draw);
  }
  draw();
}
