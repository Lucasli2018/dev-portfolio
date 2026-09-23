/* ============================================================
 * dev-portfolio · 脚本模块
 * 视频弹窗控制与预告片调度
 * ------------------------------------------------------------
 * 由 index.html 内联代码拆分而来，内容未做改写。
 * ============================================================ */
/* ==================== Video Modal & Game Trailers ==================== */
const videoModal = document.getElementById('videoModal');
const videoClose = document.getElementById('videoClose');
const videoTitle = document.getElementById('videoTitle');
const trailerCanvas = document.getElementById('trailerCanvas');
const trailerCtx = trailerCanvas.getContext('2d');

let trailerAnim = null;

function openVideoModal(game) {
  videoModal.classList.add('active');
  videoTitle.textContent = i18n[currentLang][`video.${game}`];
  
  setTimeout(() => {
    const rect = videoModal.querySelector('.video-modal-body').getBoundingClientRect();
    trailerCanvas.width = rect.width;
    trailerCanvas.height = rect.height;
    
    if (game === 'survivor') {
      startSurvivorTrailer();
    } else if (game === 'planewar') {
      startPlaneWarTrailer();
    } else if (game === 'kingdom') {
      startKingdomDefenseTrailer();
    } else if (game === 'snake') {
      startSnakeTrailer();
    } else if (game === 'tetris') {
      startTetrisTrailer();
    }
  }, 100);
}

function closeVideoModal() {
  videoModal.classList.remove('active');
  if (trailerAnim) cancelAnimationFrame(trailerAnim);
  trailerAnim = null;
}

videoClose.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) closeVideoModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal.classList.contains('active')) closeVideoModal();
});
