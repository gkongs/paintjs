const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const modeBtn = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");
const INITAIL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITAIL_COLOR;
ctx.fillStyle = INITAIL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onClickColor(event) {
  const color = event.target.style.backgroundColor;
  console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function onInputRange(event) {
  ctx.lineWidth = event.target.value;
}
function onClickModeBtn() {
  if (filling) {
    modeBtn.innerText = "FILL";
    filling = false;
  } else {
    modeBtn.innerText = "PAINT";
    filling = true;
  }
}
function onCanvasClick() {
  if (filling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}
function onClickSave() {
  const img = canvas.toDataURL("image");
  const link = document.createElement("a");
  link.href = img;
  link.download = "PaintJS🚀";
  link.click();
}
function onCM(event) {
  event.preventDefault();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", onCanvasClick);
  canvas.addEventListener("contextmenu", onCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", onClickColor)
);

if (range) range.addEventListener("input", onInputRange);
if (modeBtn) modeBtn.addEventListener("click", onClickModeBtn);
if (saveBtn) saveBtn.addEventListener("click", onClickSave);
