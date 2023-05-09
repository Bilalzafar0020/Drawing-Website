let canvas = document.getElementById("Drawing-Board"); 
let toolbox = document.getElementById("toolbar");

//  canvas setting
let cObject = canvas.getContext("2d");


let mouseDrawing = (e) =>{
cObject.lineTo(e.offsetX , e.offsetY);

cObject.stroke()
};


canvas.addEventListener("mousemove",mouseDrawing);