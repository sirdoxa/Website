// Matrix rain effect script
'use strict';

// Select the canvas and set up the context
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Global configuration object for customization
const config = {
  fontSize: 11,
  columns: null,
  drops: [],
  canvasWidth: window.innerWidth,
  canvasHeight: window.innerHeight,
  characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｱｲｳｴｵカキクケコ漢字仮名/\\|?*+~-_<>[]{}()%$#@!&',
  textColor: '#0f0',
  fadeFactor: 0.0005,
};

// Advanced initialization and resize function
function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  config.canvasWidth = canvas.width;
  config.canvasHeight = canvas.height;
  config.columns = Math.floor(canvas.width / config.fontSize);
  config.drops = Array(config.columns).fill(1);
}

// Utility: get random character from config set
function getRandomChar() {
  const { characters } = config;
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

// Class representing each column's drop data (for future expandability)
class Drop {
  constructor(column) {
    this.column = column;
    this.y = Math.random() * canvas.height;
    this.speed = config.fontSize + Math.random() * config.fontSize;
  }
  update() {
    this.y += this.speed;
    if (this.y > canvas.height + config.fontSize) {
      this.y = 0;
      this.speed = config.fontSize + Math.random() * config.fontSize;
    }
  }
}

// Initialize drops
function initDrops() {
  for (let i = 0; i < config.columns; i++) {
    config.drops[i] = new Drop(i);
  }
}

// Draw matrix rain effect
function drawMatrix() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

  ctx.globalCompositeOperation = 'source-over';
  ctx.font = `${config.fontSize}px monospace`;
  ctx.fillStyle = config.textColor;

  config.drops.forEach((drop, index) => {
    ctx.fillText(getRandomChar(), drop.column * config.fontSize, drop.y);
    drop.update();
  });
}

// Call on window resize
window.addEventListener('resize', () => {
  initCanvas();
});

// Setup initial canvas size and start animation
initCanvas();
initDrops();

// Animation loop
function animate() {
  drawMatrix();
  requestAnimationFrame(animate);
}

animate();



// Advanced interactivity: change font size with mouse wheel (with limits)
function handleWheel(e) {
  e.preventDefault();
  if (e.deltaY < 0 && config.fontSize < 40) {
    config.fontSize += 2;
  } else if (e.deltaY > 0 && config.fontSize > 8) {
    config.fontSize -= 2;
  }
  // Reinitialize drops and canvas settings when font size changes
  initCanvas();
  initDrops();
}

// Advanced responsive design: update canvas when window resizes
function handleResize() {
  initCanvas();
  initDrops();
}

// Initialization sequence
function init() {
  initCanvas();
  initDrops();
  drawMatrix();

  // Event listeners for interactivity
  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('wheel', handleWheel, { passive: false });
}

// Call the initializer
init();

