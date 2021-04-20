// Refer Canvas API Docs https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearBtn = document.getElementById('clear');

const ctx = canvas.getContext('2d');
let size = 20;
let color = 'black';
let x;
let y;
let isPressed = false;

canvas.addEventListener('mousedown', (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
  console.log(isPressed, x, y);
});

canvas.addEventListener('mouseup', (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
  console.log(isPressed, x, y);
});

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    console.log(isPressed, x2, y2);
    drawCircle(x2, y2);

    // Fix Dots effect when we drag ouse too fast
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2); // Outer circle
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2; // Line width mst be approx equal to circle diameter
  ctx.stroke();
}

// Updates size value in menu
function updateSizeOnScreen() {
  sizeEl.innerText = size;
}

drawCircle(100, 200);
drawLine(5, 5, 100, 120);

// INcrease Brush size
increaseBtn.addEventListener('click', () => {
  size += 5;
  if (size >= 50) size = 50;

  updateSizeOnScreen();
});

// Decrease brush size
decreaseBtn.addEventListener('click', () => {
  size -= 5;
  if (size <= 5) size = 5;

  updateSizeOnScreen();
});

// Color Picker
colorEl.addEventListener('change', (e) => {
  color = e.target.value;
});

// Clears the canvas
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, 600, 600);
});
