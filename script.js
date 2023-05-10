let canvas = document.getElementById("Drawing-Board"); 

//  line-width
lineWidth = document.querySelector("#line-Widther");


// colors selections
colors = document.querySelector("#stroke");

//  canvas setting
let cObject = canvas.getContext("2d");



// global variables
let cDrawing= false;
let cursorWidth = 3;



// function for mouse move  
let mouseDrawing = (e) =>{
    if(!cDrawing) return;
cObject.lineTo(e.offsetX , e.offsetY); // line according to mouse move event

cObject.stroke() // filling lines 
};



//  Tools area
// line width according to range value
lineWidth.addEventListener("change", ()=> cursorWidth = lineWidth.value)




//  colors stroke;
//  change color  according to user selected stroke style
colors.addEventListener("change", e => {
if( e.target.id ==='stroke'){
    cObject.strokeStyle = e.target.value;
};

})



// to return valuable width/height of element we have to set the canvas width/height + offset width/height
window.addEventListener("load" , () =>{
 
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});




/* we make variable above cDrawing = false and this function is for that work that when mouse
is down  start making line for that we made addeventlistner below  and when up  stop it
 also for that we make a addeventlistner below  */ 
let drawingStart = () =>{
    cDrawing = true;
    cObject.beginPath() /* their was a problem mouseup event that the new line start from 
    the old position , it is a method it will solve it */ 

  cObject.lineWidth = cursorWidth //start drawing according to the user selected cursor width   
}




// when the mouse move make lines
canvas.addEventListener("mousemove",mouseDrawing);


//  when the mouse down then start drawing (update after mouse move)
canvas.addEventListener("mousedown", drawingStart);



//  when user up the mouse stop making lines
canvas.addEventListener("mouseup", () => cDrawing = false);




