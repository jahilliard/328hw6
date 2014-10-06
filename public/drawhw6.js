var corr = "apple";

function circle() {
  corr = "circle"
}

function rect() {
  corr = "rectangle"
}


$( document ).ready(function() {

    document.ontouchmove = function(e){ e.preventDefault(); }

    var draw = {
      stroke : "#00FF00",
      clear: "#FF1D8E",
      fill: "#FF1D8E",
      size: 2
    }
    
    function clear () {
      console.log("WAZZZZ HURR");
      context.fillStyle = draw.clear;
      context.rect(0, 0, draw.width, draw.height);
      context.fill();
    }

    var canvas  = document.getElementById('main');
    var context = canvas.getContext("2d");

    var lastx;
    var lasty;

    var canvastop = canvas.offsetTop;
    var canvasleft = canvas.offsetLeft; 

    function path(x1,y1) {
      context.beginPath();

      context.strokeStyle = draw.stroke;
      context.lineCap = draw.cap;
      context.lineJoin = draw.join;
      context.lineWidth = draw.size;

      if (corr === "circle") {
        context.arc(x1,y1,x1+10,y1+10, Math.PI*2,true);
      }
      else if (corr === "rectangle") {
        context.rect(x1,y1,x1+10,y1+10, Math.PI*2,true);
      }
      else {
        alert("pick what you want to draw!");
        clear();
      }

      context.stroke();
      context.closePath();
    }

  function position(event,action) {

    event.preventDefault(); 

    lastx = event.touches[0].clientX - canvasleft;   
    lasty = event.touches[0].clientY - canvastop;    

    action(lastx,lasty);

  }

  canvas.ontouchstart = function(event){
    position(event, function () {path(lastx, lasty)});
  }

  canvas.ontouchmove = function(event){                   
    position(event, function () {path(lastx,lasty)});
  }


  var clearButton = document.getElementById('clear');
  clearButton.onclick = clear;

  clear();

});
