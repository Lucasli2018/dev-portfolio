/* ============================================================
 * dev-portfolio · 脚本模块
 * 俄罗斯方块预告片
 * ------------------------------------------------------------
 * Canvas 自动播放 Tetris 模拟预览
 * ============================================================ */
/* --- Tetris Game Trailer --- */
function startTetrisTrailer() {
  const ctx = trailerCtx;
  const W = trailerCanvas.width;
  const H = trailerCanvas.height;

  const cols = 10;
  const rows = 20;
  const cellSize = Math.min(Math.floor(W / 16), Math.floor(H / 22));
  const boardW = cols * cellSize;
  const boardH = rows * cellSize;
  const boardX = (W - boardW) / 2;
  const boardY = (H - boardH) / 2;

  const COLORS = {
    I: '#00E5FF',
    O: '#FFD600',
    T: '#AB47BC',
    L: '#FF6B47',
    J: '#42A5F5',
    S: '#66BB6A',
    Z: '#EF5350'
  };

  const SHAPES = {
    I: [[1,1,1,1]],
    O: [[1,1],[1,1]],
    T: [[0,1,0],[1,1,1]],
    L: [[0,0,1],[1,1,1]],
    J: [[1,0,0],[1,1,1]],
    S: [[0,1,1],[1,1,0]],
    Z: [[1,1,0],[0,1,1]]
  };

  const TYPES = Object.keys(SHAPES);

  let board = [];
  for (let r = 0; r < rows; r++) {
    board.push(new Array(cols).fill(null));
  }

  let score = 0;
  let lines = 0;
  let level = 1;
  let dropTimer = 0;
  let dropInterval = 18;
  let time = 0;
  let particles = [];
  let flashLines = [];
  let flashTimer = 0;

  function newPiece() {
    const type = TYPES[Math.floor(Math.random() * TYPES.length)];
    const shape = SHAPES[type].map(row => [...row]);
    return {
      type,
      shape,
      x: Math.floor((cols - shape[0].length) / 2),
      y: -shape.length + 1,
      color: COLORS[type]
    };
  }

  let current = newPiece();
  let next = newPiece();

  function rotate(piece) {
    const shape = piece.shape;
    const rows = shape.length;
    const cols = shape[0].length;
    const rotated = [];
    for (let c = 0; c < cols; c++) {
      const row = [];
      for (let r = rows - 1; r >= 0; r--) {
        row.push(shape[r][c]);
      }
      rotated.push(row);
    }
    return rotated;
  }

  function isValid(piece, board, dx, dy, shape) {
    shape = shape || piece.shape;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (!shape[r][c]) continue;
        const nx = piece.x + c + dx;
        const ny = piece.y + r + dy;
        if (nx < 0 || nx >= cols) return false;
        if (ny >= rows) return false;
        if (ny >= 0 && board[ny][nx]) return false;
      }
    }
    return true;
  }

  function merge(piece, board) {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          const ny = piece.y + r;
          const nx = piece.x + c;
          if (ny >= 0 && ny < rows) {
            board[ny][nx] = piece.color;
          }
        }
      }
    }
  }

  function clearLines() {
    const cleared = [];
    for (let r = rows - 1; r >= 0; r--) {
      if (board[r].every(cell => cell !== null)) {
        cleared.push(r);
      }
    }
    if (cleared.length > 0) {
      flashLines = cleared.slice();
      flashTimer = 15;
      cleared.forEach(r => {
        for (let c = 0; c < cols; c++) {
          const px = boardX + c * cellSize + cellSize / 2;
          const py = boardY + r * cellSize + cellSize / 2;
          for (let k = 0; k < 6; k++) {
            particles.push({
              x: px, y: py,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8 - 2,
              life: 30,
              color: board[r][c] || '#FF6B47'
            });
          }
        }
      });
    }
    return cleared;
  }

  function removeLines(cleared) {
    cleared.sort((a, b) => a - b);
    cleared.forEach(r => {
      board.splice(r, 1);
      board.unshift(new Array(cols).fill(null));
    });
    const points = [0, 100, 300, 500, 800];
    score += points[cleared.length] * level;
    lines += cleared.length;
    level = Math.floor(lines / 10) + 1;
    dropInterval = Math.max(6, 18 - (level - 1) * 2);
  }

  function drawBlock(x, y, color, alpha) {
    alpha = alpha === undefined ? 1 : alpha;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x + 1, y + 1, cellSize - 2, cellSize - 2, 3);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.roundRect(x + 1, y + 1, cellSize - 2, 4, 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function drawScene() {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#0a1929');
    bgGrad.addColorStop(1, '#0d1f33');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255, 107, 71, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(boardX + i * cellSize, boardY);
      ctx.lineTo(boardX + i * cellSize, boardY + boardH);
      ctx.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      ctx.beginPath();
      ctx.moveTo(boardX, boardY + j * cellSize);
      ctx.lineTo(boardX + boardW, boardY + j * cellSize);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255, 107, 71, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(boardX, boardY, boardW, boardH);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c]) {
          if (flashTimer > 0 && flashLines.includes(r)) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#fff';
            drawBlock(boardX + c * cellSize, boardY + r * cellSize, '#fff', 1);
            ctx.shadowBlur = 0;
          } else {
            drawBlock(boardX + c * cellSize, boardY + r * cellSize, board[r][c]);
          }
        }
      }
    }

    if (flashTimer > 0) {
      flashTimer--;
      if (flashTimer === 0) {
        removeLines(clearLines());
        flashLines = [];
      }
    }

    if (flashTimer === 0) {
      dropTimer++;
      if (dropTimer >= dropInterval) {
        dropTimer = 0;
        if (isValid(current, board, 0, 1)) {
          current.y++;
        } else {
          merge(current, board);
          const cleared = clearLines();
          if (cleared.length === 0) {
            current = next;
            next = newPiece();
            if (!isValid(current, board, 0, 0)) {
              board = [];
              for (let r = 0; r < rows; r++) {
                board.push(new Array(cols).fill(null));
              }
              score = 0;
              lines = 0;
              level = 1;
              dropInterval = 18;
            }
          }
        }
      }

      if (time % 3 === 0) {
        const rotated = rotate(current);
        if (Math.random() < 0.3 && isValid(current, board, 0, 0, rotated)) {
          current.shape = rotated;
        } else if (Math.random() < 0.4 && isValid(current, board, -1, 0)) {
          current.x--;
        } else if (Math.random() < 0.4 && isValid(current, board, 1, 0)) {
          current.x++;
        }
      }

      if (current.y >= 0) {
        for (let r = 0; r < current.shape.length; r++) {
          for (let c = 0; c < current.shape[r].length; c++) {
            if (current.shape[r][c]) {
              const by = current.y + r;
              const bx = current.x + c;
              if (by >= 0) {
                drawBlock(boardX + bx * cellSize, boardY + by * cellSize, current.color);
              }
            }
          }
        }
      }

      let ghostY = current.y;
      while (isValid(current, board, 0, ghostY - current.y + 1)) {
        ghostY++;
      }
      if (ghostY > current.y && current.y >= 0) {
        for (let r = 0; r < current.shape.length; r++) {
          for (let c = 0; c < current.shape[r].length; c++) {
            if (current.shape[r][c]) {
              const by = ghostY + r;
              const bx = current.x + c;
              if (by >= 0) {
                drawBlock(boardX + bx * cellSize, boardY + by * cellSize, current.color, 0.2);
              }
            }
          }
        }
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life--;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 30;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      if (p.life <= 0) particles.splice(i, 1);
    }

    const nextBoxX = boardX + boardW + 20;
    const nextBoxY = boardY + 10;
    const nextBoxSize = cellSize * 4;
    if (nextBoxX + nextBoxSize < W) {
      ctx.strokeStyle = 'rgba(255, 107, 71, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(nextBoxX, nextBoxY, nextBoxSize, nextBoxSize);
      ctx.fillStyle = 'rgba(255, 107, 71, 0.6)';
      ctx.font = '500 11px Inter, sans-serif';
      ctx.fillText('NEXT', nextBoxX + 4, nextBoxY - 4);
      const ns = next.shape;
      const nsCell = cellSize * 0.8;
      const nOffsetX = nextBoxX + (nextBoxSize - ns[0].length * nsCell) / 2;
      const nOffsetY = nextBoxY + (nextBoxSize - ns.length * nsCell) / 2;
      for (let r = 0; r < ns.length; r++) {
        for (let c = 0; c < ns[r].length; c++) {
          if (ns[r][c]) {
            ctx.fillStyle = next.color;
            ctx.beginPath();
            ctx.roundRect(nOffsetX + c * nsCell + 1, nOffsetY + r * nsCell + 1, nsCell - 2, nsCell - 2, 2);
            ctx.fill();
          }
        }
      }
    }

    const isCyber = document.documentElement.getAttribute('data-theme') === 'cyberpunk';
    const hudColor = isCyber ? 'rgba(164, 230, 57, 0.9)' : 'rgba(255, 255, 255, 0.85)';
    ctx.fillStyle = hudColor;
    ctx.font = '600 14px Inter, sans-serif';
    const hudX = boardX < 80 ? boardX : boardX - 5;
    ctx.fillText(`SCORE ${score}  LINES ${lines}  LV.${level}`, hudX, boardY - 8);

    time++;
    trailerAnim = requestAnimationFrame(drawScene);
  }

  drawScene();
}
