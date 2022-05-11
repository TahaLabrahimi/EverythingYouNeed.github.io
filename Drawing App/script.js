/** @format */

const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const ctx = canvas.getContext('2d');

// Initial Setting for Drawing App
let isPressed = false;
let size = 10; //radius size
colorEl.value = 'black';
let color = colorEl.value;
let x;
let y;

// Getting starting points - x, y coordinate
canvas.addEventListener('mousedown', (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;

  //console.log(isPressed, x, y);
});

// Stop drawing
document.addEventListener('mouseup', (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;

  //console.log(isPressed, x, y);
});

// Drawing
canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    let x2 = e.offsetX;
    let y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
    //console.log(x, y);
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.lineWidth = size * 2;
  // To make same with of circle
  // size = radius >> circle's width = radius * 2
}

// Updating size on screen when user modify width of pen
function updateSizeOnScreen() {
  sizeEl.innerText = size;
}

// Increase width of pen
increaseBtn.addEventListener('click', () => {
  size += 5;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
  //console.log('clicked +');
});

// decrease width of pen
decreaseBtn.addEventListener('click', () => {
  size -= 5;

  if (size < 5) {
    size = 5;
  }

  updateSizeOnScreen();
  //console.log('clicked -');
});

// Change pen's color
colorEl.addEventListener('change', (e) => (color = e.target.value));

// Clear canvas
clearEl.addEventListener('click', () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);
