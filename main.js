// Declare variables with const or let
const canvas = document.querySelector("#Drawing-Board");
const context = canvas.getContext("2d"); 
const lineWidth = document.querySelector("#line-Widther"); // line-width
const colors = document.querySelector("#stroke");  // stroke
const clear = document.querySelector("#Reset"); // reset
const save = document.querySelector("#download"); //  download image
  // const text1 = document.querySelector("#text") //  text 
const shapes = document.querySelectorAll(".tool");  // for all shapes 



// global variables
let cDrawing = false;   // to control lines during mouse down , up etc
let cursorWidth = 3;   // for line width 
let selectedShape = "Brush"; // for shapes
let prevMouseX, prevMouseY=0;  



// Set canvas width and height on window load
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

//  setup for the rectangle

const drawRect = (e) =>{
  context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  context.strokeRect( e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY  );
     // takes 4 parameters x,y axis , width,height 
       // it will draw a rectangle not as like stroke
}


//  setup of circle

const drawCircle = (e) =>{
  context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

context.beginPath();
  // creating new path to draw circle because before this beginpath and below radius line it was making one circle and not according to mouse  pointer

// getting radius according to mouse pointer
let radius = Math.sqrt(Math.pow ((e.offsetX - prevMouseX), 2) + Math.pow((e.offsetY - prevMouseY), 2));   

//  Math.sqt return the square root of number
//  Math . pow return the value  of x to the power of y , power is given by us which is 2
 
context.arc(prevMouseX,prevMouseY,radius , 0 , 2 * Math.PI  ) // Pi is the ratio of circumfernce of circle
  context.stroke();
  
}



// Start drawing when the mouse is down
const mouseDown = (e) => {
  cDrawing = true;

prevMouseX = e.offsetX;
prevMouseY = e.offsetY; 
  context.beginPath();
  context.lineWidth = cursorWidth;
};





// Draw lines as the mouse moves
const mouseMove = (e) => {
  if (!cDrawing) return;

if(selectedShape === "Brush"){
  
  context.lineTo(e.offsetX, e.offsetY);  // draw the line according to x and y coordinates
  context.stroke();   //  visible the line 
}
else if (selectedShape === "Rectangle"){
  drawRect(e);  // will draw the rectangle it's a method
}
else if (selectedShape === "circle"){
  drawCircle(e); //  circle
};

};

// This code adds a click event listener to each element with the class name "shapes". When a shape button is clicked, it performs the following actions:

// Removes the "active" class from the element with class name "options".
// Adds the "active" class to the clicked shape button element.
// Sets the value of the variable "selectedShape" to the id of the clicked shape button.
// Outputs the id of the clicked shape button to the console.


shapes.forEach(btn =>{
  btn.addEventListener("click" , ()=>{ 
 
    document.querySelector(".options ").classList.remove("active");
    btn.classList.add("active")  ;
    selectedShape = btn.id
     console.log(btn.id);
  })
})




// Update cursor width when the user changes the line width
lineWidth.addEventListener("change", () => (cursorWidth = lineWidth.value));



// Change stroke color when the user selects a color
colors.addEventListener("change", (e) => {
  if (e.target.id === "stroke") {
    context.strokeStyle = e.target.value;
  }
});



// Clear the canvas when the user clicks the reset button
clear.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});



// Save the canvas as an image when the user clicks the download button
save.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});


//   For touch screen (to function also on touch events)




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
       context.beginPath();
       context.moveTo(finalOffsetX, finalOffsetY);
       context.lineTo(coordinates.x, coordinates.y);
       context.stroke();
       finalOffsetX = coordinates.x;
       finalOffsetY = coordinates.y;
       context.strokeStyle = colors.value;
       context.lineWidth = lineWidth.value;
       
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
   

  //  draw text 
  //  text1.addEventListener("click", () => {
  //   cDrawing = false;
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   drawText();
  // });


  // function drawText() {
  //   const text = document.querySelector("#textInput").value;
  //   if (!text) return;
  //   context.font = "24px sans-serif";
  //   context.fillText(text, 40, 40);
  // }



// Add event listeners to the canvas for drawing
if (canvas) {
  canvas.addEventListener("mousemove", mouseMove); //  if mouse move
  canvas.addEventListener("mousedown", mouseDown); //  if mouse down
  canvas.addEventListener("mouseup", () => (cDrawing = false));  // if mouse up false the line making

};





