/* ============================================================
 * dev-portfolio · 脚本模块
 * 月光牧场预告片
 * ------------------------------------------------------------
 * 由 index.html 内联代码拆分而来，内容未做改写。
 * ============================================================ */
/* --- Moonlight Ranch Trailer --- */
function startRanchTrailer() {
  const ctx = trailerCtx;
  const W = trailerCanvas.width;
  const H = trailerCanvas.height;
  let time = 0;

  // 星点
  const stars = [];
  for (let i = 0; i < 60; i++) {
    stars.push({ x: Math.random() * W, y: Math.random() * H * 0.6, r: Math.random() * 1.5 + 0.5, p: Math.random() * Math.PI * 2 });
  }
  // 作物
  const crops = [];
  for (let i = 0; i < 7; i++) {
    crops.push({ x: 60 + i * (W - 120) / 6, h: 0, p: Math.random() * Math.PI * 2 });
  }
  // 月光浮尘
  const motes = [];
  for (let i = 0; i < 18; i++) {
    motes.push({ x: Math.random() * W, y: Math.random() * H, s: Math.random() * 0.4 + 0.1, p: Math.random() * Math.PI * 2 });
  }

  function draw() {
    // 夜空
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#1b1140');
    sky.addColorStop(0.5, '#2a1a5e');
    sky.addColorStop(1, '#3a2350');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // 珊瑚橙月亮 + 光晕
    const mx = W * 0.78, my = H * 0.24, mr = 46;
    const glow = ctx.createRadialGradient(mx, my, 0, mx, my, mr * 3.2);
    glow.addColorStop(0, 'rgba(255,138,76,0.55)');
    glow.addColorStop(1, 'rgba(255,138,76,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(mx, my, mr * 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFB37A';
    ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath(); ctx.arc(mx - 14, my - 12, 8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(mx + 10, my + 8, 5, 0, Math.PI * 2); ctx.fill();

    // 闪烁星
    stars.forEach(s => {
      const a = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.03 + s.p));
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });

    // 地面
    ctx.fillStyle = '#241a33';
    ctx.fillRect(0, H * 0.72, W, H * 0.28);
    ctx.fillStyle = 'rgba(255,138,76,0.08)';
    ctx.fillRect(0, H * 0.72, W, 6);

    // 作物（生长 + 摇曳）
    crops.forEach(c => {
      c.h = 30 + 18 * Math.sin(time * 0.04 + c.p);
      const sway = Math.sin(time * 0.05 + c.p) * 4;
      const baseY = H * 0.72;
      ctx.strokeStyle = '#7bc98a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(c.x, baseY);
      ctx.quadraticCurveTo(c.x + sway, baseY - c.h * 0.6, c.x + sway * 1.4, baseY - c.h);
      ctx.stroke();
      ctx.fillStyle = '#9be8a6';
      ctx.beginPath();
      ctx.ellipse(c.x + sway * 1.4, baseY - c.h, 9, 6, sway * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,179,122,0.5)';
      ctx.beginPath(); ctx.arc(c.x + sway * 1.4, baseY - c.h, 2.5, 0, Math.PI * 2); ctx.fill();
    });

    // 小羊（上下轻浮）
    const ax = W * 0.2, ay = H * 0.72 - 6 + Math.sin(time * 0.06) * 3;
    ctx.fillStyle = '#e9e3f5';
    ctx.beginPath(); ctx.arc(ax, ay - 14, 12, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(ax + 12, ay - 20, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#3a2350';
    ctx.beginPath(); ctx.arc(ax + 14, ay - 22, 1.6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#caa0ff';
    ctx.fillRect(ax - 10, ay - 6, 3, 8); ctx.fillRect(ax + 8, ay - 6, 3, 8);

    // 月光浮尘
    motes.forEach(m => {
      m.y -= m.s; m.x += Math.sin(time * 0.02 + m.p) * 0.3;
      if (m.y < 0) { m.y = H; m.x = Math.random() * W; }
      ctx.fillStyle = 'rgba(255,179,122,0.7)';
      ctx.beginPath(); ctx.arc(m.x, m.y, 2, 0, Math.PI * 2); ctx.fill();
    });

    // HUD
    const cyber = document.documentElement.getAttribute('data-theme') === 'cyberpunk';
    ctx.fillStyle = cyber ? 'rgba(164,230,57,0.9)' : 'rgba(255,255,255,0.85)';
    ctx.font = '600 14px Inter, sans-serif';
    ctx.fillText('🌙 月光牧场 · 月下经营', 20, 30);

    time++;
    trailerAnim = requestAnimationFrame(draw);
  }
  draw();
}
