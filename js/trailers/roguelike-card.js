/* ============================================================
 * dev-portfolio · 脚本模块
 * 肉鸽卡牌预告片
 * ------------------------------------------------------------
 * 由 index.html 内联代码拆分而来，内容未做改写。
 * ============================================================ */
/* --- Roguelike Card Trailer --- */
function startRoguelikeCardTrailer() {
  const ctx = trailerCtx;
  const W = trailerCanvas.width;
  const H = trailerCanvas.height;
  let time = 0;

  const suits = ['♠', '♥', '♦', '♣'];
  const suitColors = ['#cfd8ff', '#ff7a8a', '#ffb37a', '#9be8a6'];
  const deck = [];
  for (let i = 0; i < 6; i++) {
    deck.push({ x: Math.random() * W, y: Math.random() * H * 0.5, r: Math.random() * Math.PI, s: 0.4 + Math.random() * 0.5, sp: i });
  }
  let atk = 0;
  let dmg = 0;
  const hero = { x: W * 0.25, y: H * 0.6 };
  const enemy = { x: W * 0.75, y: H * 0.6 };

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }
  function drawCard(x, y, w, h, suit, col, scale, rot) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot); ctx.scale(scale, scale);
    ctx.fillStyle = '#fbf7ff';
    roundRect(ctx, -w / 2, -h / 2, w, h, 8); ctx.fill();
    ctx.strokeStyle = 'rgba(120,90,200,0.5)'; ctx.lineWidth = 2;
    roundRect(ctx, -w / 2, -h / 2, w, h, 8); ctx.stroke();
    ctx.fillStyle = col;
    ctx.font = '700 22px Inter, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(suit, 0, 0);
    ctx.restore();
  }

  function draw() {
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#1a1030');
    bg.addColorStop(1, '#2a1a4e');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // 漂浮牌库
    deck.forEach((c, i) => {
      c.r += 0.01 * c.s;
      const yy = c.y + Math.sin(time * 0.03 + c.sp) * 10;
      const xx = c.x + Math.cos(time * 0.02 + c.sp) * 14;
      drawCard(xx, yy, 46, 64, suits[i % 4], suitColors[i % 4], 0.8, c.r * 0.15);
    });

    // 英雄
    ctx.fillStyle = '#5ad1ff';
    ctx.beginPath(); ctx.arc(hero.x, hero.y, 26, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '600 12px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('🛡️', hero.x, hero.y);

    // 敌人 + 血条
    const ehp = Math.max(0, 100 - dmg);
    ctx.fillStyle = ehp > 40 ? '#ff6b6b' : '#ff3b3b';
    ctx.beginPath(); ctx.arc(enemy.x, enemy.y, 26, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillText('👹', enemy.x, enemy.y);
    ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(enemy.x - 30, enemy.y - 40, 60, 6);
    ctx.fillStyle = '#7CFC9B'; ctx.fillRect(enemy.x - 30, enemy.y - 40, 60 * (ehp / 100), 6);

    // 攻击脉冲
    atk = (time % 90);
    if (atk < 18 && atk > 0) {
      ctx.strokeStyle = `rgba(255,210,120,${1 - atk / 18})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(hero.x + 20, hero.y);
      ctx.lineTo(enemy.x - 20, enemy.y);
      ctx.stroke();
      if (atk === 1) dmg = Math.min(100, dmg + 12 + Math.floor(Math.random() * 8));
    }
    if (dmg >= 100) dmg = 0;

    // 底部手牌
    for (let i = 0; i < 5; i++) {
      const hx = W / 2 - 110 + i * 55;
      const hy = H - 40 + Math.sin(time * 0.05 + i) * 4;
      drawCard(hx, hy, 40, 56, suits[i % 4], suitColors[i % 4], 1, Math.sin(time * 0.02 + i) * 0.06);
    }

    // HUD
    const cyber = document.documentElement.getAttribute('data-theme') === 'cyberpunk';
    ctx.fillStyle = cyber ? 'rgba(164,230,57,0.9)' : 'rgba(255,255,255,0.85)';
    ctx.font = '600 14px Inter, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText('🃏 肉鸽卡牌 · 卡牌构筑', 20, 30);

    time++;
    trailerAnim = requestAnimationFrame(draw);
  }
  draw();
}
