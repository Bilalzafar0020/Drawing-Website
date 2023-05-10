// Declare variables with const or let
const canvas = document.querySelector("#Drawing-Board");
const cObject = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-Widther");
const colors = document.querySelector("#stroke");
const clear = document.querySelector("#Reset");
const save = document.querySelector("#download");
let cDrawing = false;
let cursorWidth = 3;

// Set canvas width and height on window load
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

// Start drawing when the mouse is down
const drawingStart = () => {
  cDrawing = true;
  cObject.beginPath();
  cObject.lineWidth = cursorWidth;
};

// Draw lines as the mouse moves
const mouseDrawing = (e) => {
  if (!cDrawing) return;
  cObject.lineTo(e.offsetX, e.offsetY);
  cObject.stroke();
};

// Update cursor width when the user changes the line width
lineWidth.addEventListener("change", () => (cursorWidth = lineWidth.value));

// Change stroke color when the user selects a color
colors.addEventListener("change", (e) => {
  if (e.target.id === "stroke") {
    cObject.strokeStyle = e.target.value;
  }
});

// Clear the canvas when the user clicks the reset button
clear.addEventListener("click", () => {
  cObject.clearRect(0, 0, canvas.width, canvas.height);
});

// Save the canvas as an image when the user clicks the download button
save.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});

// Add event listeners to the canvas for drawing
if (canvas) {
  canvas.addEventListener("mousemove", mouseDrawing);
  canvas.addEventListener("mousedown", drawingStart);
  canvas.addEventListener("mouseup", () => (cDrawing = false));
}
