/* ============================================================
 * dev-portfolio · 脚本模块
 * 贪吃蛇预告片
 * ------------------------------------------------------------
 * 由 index.html 内联代码拆分而来，内容未做改写。
 * ============================================================ */
/* --- Snake Game Trailer --- */
function startSnakeTrailer() {
  const ctx = trailerCtx;
  const W = trailerCanvas.width;
  const H = trailerCanvas.height;

  let time = 0;
  let score = 0;
  let combo = 1;

  const cellSize = 20;
  const cols = Math.floor(W / cellSize);
  const rows = Math.floor(H / cellSize);
  const offsetX = (W - cols * cellSize) / 2;
  const offsetY = (H - rows * cellSize) / 2;

  // Snake AI (auto-play)
  const snake = [];
  for (let i = 0; i < 5; i++) {
    snake.push({ x: Math.floor(cols / 2) - i, y: Math.floor(rows / 2) });
  }
  let dir = { x: 1, y: 0 };
  let moveTimer = 0;
  const moveInterval = 6;

  let food = { x: Math.floor(cols / 2) + 5, y: Math.floor(rows / 2) };
  let comboTimer = 0;
  const particles = [];

  function spawnFood() {
    food = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows)
    };
    // Don't spawn on snake
    while (snake.some(s => s.x === food.x && s.y === food.y)) {
      food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
      };
    }
  }

  function drawScene() {
    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#0a1929');
    bgGrad.addColorStop(1, '#0d1f33');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(76, 175, 80, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(offsetX + i * cellSize, offsetY);
      ctx.lineTo(offsetX + i * cellSize, offsetY + rows * cellSize);
      ctx.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY + j * cellSize);
      ctx.lineTo(offsetX + cols * cellSize, offsetY + j * cellSize);
      ctx.stroke();
    }

    // Border glow
    ctx.strokeStyle = 'rgba(76, 175, 80, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(offsetX, offsetY, cols * cellSize, rows * cellSize);

    // AI move logic
    moveTimer++;
    if (moveTimer >= moveInterval) {
      moveTimer = 0;

      // Simple AI: move toward food, avoid walls and self
      const head = snake[0];
      const possibleDirs = [
        { x: 1, y: 0 }, { x: -1, y: 0 },
        { x: 0, y: 1 }, { x: 0, y: -1 }
      ].filter(d => !(d.x === -dir.x && d.y === -dir.y)); // No reverse

      let bestDir = dir;
      let bestScore = -999;
      for (const d of possibleDirs) {
        const nx = head.x + d.x;
        const ny = head.y + d.y;
        // Wall check
        if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
        // Self check
        if (snake.some((s, si) => si < snake.length - 1 && s.x === nx && s.y === ny)) continue;
        // Distance to food
        const dist = Math.abs(nx - food.x) + Math.abs(ny - food.y);
        let s = 100 - dist;
        // Prefer continuing same direction
        if (d.x === dir.x && d.y === dir.y) s += 5;
        if (s > bestScore) { bestScore = s; bestDir = d; }
      }
      dir = bestDir;

      // Move
      const newHead = { x: head.x + dir.x, y: head.y + dir.y };

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        score += 10 * combo;
        combo++;
        comboTimer = 60;
        // Eat particles
        const fx = offsetX + food.x * cellSize + cellSize / 2;
        const fy = offsetY + food.y * cellSize + cellSize / 2;
        for (let k = 0; k < 12; k++) {
          particles.push({
            x: fx, y: fy,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 25,
            color: ['#4CAF50', '#FFD54F', '#FF6B47'][Math.floor(Math.random() * 3)]
          });
        }
        spawnFood();
      } else {
        snake.pop();
      }
      snake.unshift(newHead);
    }

    // Draw food (pulsing)
    const pulse = 1 + Math.sin(time * 0.15) * 0.15;
    const fx = offsetX + food.x * cellSize + cellSize / 2;
    const fy = offsetY + food.y * cellSize + cellSize / 2;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#FF6B47';
    ctx.fillStyle = '#FF6B47';
    ctx.beginPath();
    ctx.arc(fx, fy, (cellSize / 2 - 2) * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw snake
    snake.forEach((s, i) => {
      const sx = offsetX + s.x * cellSize;
      const sy = offsetY + s.y * cellSize;
      const isHead = i === 0;
      const t = i / snake.length;

      // Body gradient green
      const r = Math.floor(76 + (139 - 76) * t);
      const g = Math.floor(175 - (175 - 195) * t);
      const b = Math.floor(80 - (80 - 74) * t);
      ctx.fillStyle = `rgb(${r},${g},${b})`;

      // Rounded rect
      const pad = isHead ? 1 : 2;
      const radius = isHead ? 6 : 4;
      ctx.beginPath();
      ctx.roundRect(sx + pad, sy + pad, cellSize - pad * 2, cellSize - pad * 2, radius);
      ctx.fill();

      // Head eyes
      if (isHead) {
        ctx.fillStyle = '#fff';
        const eyeOffX = dir.x * 3;
        const eyeOffY = dir.y * 3;
        const eyePerpX = dir.y * 4;
        const eyePerpY = dir.x * 4;
        ctx.beginPath();
        ctx.arc(sx + cellSize / 2 + eyeOffX - eyePerpX, sy + cellSize / 2 + eyeOffY - eyePerpY, 3, 0, Math.PI * 2);
        ctx.arc(sx + cellSize / 2 + eyeOffX + eyePerpX, sy + cellSize / 2 + eyeOffY + eyePerpY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.arc(sx + cellSize / 2 + eyeOffX - eyePerpX, sy + cellSize / 2 + eyeOffY - eyePerpY, 1.5, 0, Math.PI * 2);
        ctx.arc(sx + cellSize / 2 + eyeOffX + eyePerpX, sy + cellSize / 2 + eyeOffY + eyePerpY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life--;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 25;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      if (p.life <= 0) particles.splice(i, 1);
    }

    // Combo decay
    if (comboTimer > 0) {
      comboTimer--;
      if (comboTimer === 0) combo = 1;
    }

    // HUD
    const isCyberHUD4 = document.documentElement.getAttribute('data-theme') === 'cyberpunk';
    const hudColor4 = isCyberHUD4 ? 'rgba(164, 230, 57, 0.9)' : 'rgba(255, 255, 255, 0.85)';
    ctx.fillStyle = hudColor4;
    ctx.font = '600 14px Inter, sans-serif';
    ctx.fillText(`🍎 ${score}  🔥 Combo x${combo}  🐍 Len ${snake.length}  Lv.${Math.floor(score / 50) + 1}`, 20, 30);

    time++;
    trailerAnim = requestAnimationFrame(drawScene);
  }

  drawScene();
}
