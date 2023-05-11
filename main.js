// Declare variables with const or let
const canvas = document.querySelector("#Drawing-Board");
const cObject = canvas.getContext("2d"); 
const lineWidth = document.querySelector("#line-Widther"); // line-width
const colors = document.querySelector("#stroke");  // stroke
const clear = document.querySelector("#Reset"); // reset
const save = document.querySelector("#download"); //  download image
 // const text1 = document.querySelector("#text") //  text 

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
  cObject.lineTo(e.offsetX, e.offsetY);  // draw the line according to x and y coordinates
  cObject.stroke();   //  visible the line 
};

/*  Draw text

let text  =  () =>    {
  
cObject.font("18px san-serif")
cObject.fillText( text1.value ,10,50);
};  */ 


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


//   For touch screen



canvas.addEventListener("touchstart", function (event) {
  event.preventDefault();
  cDrawing = true;
  let coordinates = getCoordinates(event.touches[0]);
  finalOffsetX = coordinates.x;
  finalOffsetY = coordinates.y;
   } );
   
   canvas.addEventListener("touchmove", function (event) {
     event.preventDefault();
     if (cDrawing) {
       let coordinates = getCoordinates(event.touches[0]);
       cObject.beginPath();
       cObject.moveTo(finalOffsetX, finalOffsetY);
       cObject.lineTo(coordinates.x, coordinates.y);
       cObject.stroke();
       finalOffsetX = coordinates.x;
       finalOffsetY = coordinates.y;
       cObject.strokeStyle = colors.value;
       cObject.lineWidth = lineWidth.value;
     }
   });
  
   canvas.addEventListener("touchend", function () {
     cDrawing = false;
   });
  
   //get by youtube help
  
   function getCoordinates(touch) {
     let rect = canvas.getBoundingClientRect();
     return {
       x: touch.clientX - rect.left,
       y: touch.clientY - rect.top,
     };
   }




// Add event listeners to the canvas for drawing
if (canvas) {
  canvas.addEventListener("mousemove", mouseDrawing); //  if mouse move
  canvas.addEventListener("mousedown", drawingStart); //  if mouse down
  canvas.addEventListener("mouseup", () => (cDrawing = false));  // if mouse up false the line making

}





