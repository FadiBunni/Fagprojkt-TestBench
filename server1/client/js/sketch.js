var socket = io();

socket.on('connected', 'hey');

var s = function(p) {

  p.setup = function() {
    //create canvas and center it
    var canvas = p.createCanvas(800, 800);
    centerCanvas(canvas);
    p.background(0);

    arrow(p,200,200,5);



  };

  p.draw = function() {
  	

    
  };
};

var myp5 = new p5(s);

//Ui function
function centerCanvas(canvas) {
  var x = (myp5.windowWidth - myp5.width) / 2;
  var y = (myp5.windowHeight - myp5.height) / 2;
  canvas.position(x, y);
}

function arrow(p,x,y,length){
  p.push();
  p.translate(x,y);
  p.beginShape();
  p.vertex(0,-length);
  p.vertex(5*length,-length);
  p.vertex(5*length,-3*length);
  p.vertex(9*length,0);
  p.vertex(5*length,3*length);
  p.vertex(5*length,length);
  p.vertex(0,length);
  p.endShape();
}