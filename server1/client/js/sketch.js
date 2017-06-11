var socket = io();

socket.on('connected', 'hey');

var s = function(p) {

  var value = false;
  var direction = 90;
  var isKeyPressed = false;

  p.setup = function() {
    //create canvas and center it
    var canvas = p.createCanvas(800, 800);
    centerCanvas(canvas);
    p.background(255);
  };

  p.draw = function() {

      p.fill(128,128,128);
      Arrow(340,390,10,1);
      Arrow(500,390,10,0);
      Arrow(420,310,10,2/3);
      Arrow(420,470,10,2);
    if(value === 0){
      p.fill(128,128,128);
      Arrow(340,390,10,1);
      Arrow(500,390,10,0);
      Arrow(420,310,10,2/3);
      Arrow(420,470,10,2);
    }else if(value === 1){
      p.fill(0,204,0);
      Arrow(340,390,10,1);
      direction -= 5;
    }else if(value === 2){
      p.fill(0,204,0);
      Arrow(500,390,10,0);
      direction += 5;
    }else if(value === 3){
      p.fill(0,204,0);
      Arrow(420,310,10,2/3);
    }else if(value === 4){
      p.fill(0,204,0);
      Arrow(420,470,10,2)
    }

    if(direction >=180){
      direction = 180;
    }else if(direction <= 0){
      direction = 0;
    }
    if(isKeyPressed){
      console.log(direction);
      socket.emit("isKeyPressed", isKeyPressed);
      socket.emit("getDirectionData",direction);
    }
  };

  p.keyPressed = function(){
    if(p.keyCode ===  p.LEFT_ARROW){
      isKeyPressed = true;
      value = 1;
    }else if(p.keyCode === p.RIGHT_ARROW){
      value = 2;
      isKeyPressed = true;
    }else if(p.keyCode === p.UP_ARROW){
      value = 3;
      isKeyPressed = true;
    }else if(p.keyCode === p.DOWN_ARROW){
      value = 4;
      isKeyPressed = true;
    }
  };

  p.keyReleased = function(){
    if(p.keyCode ===  p.LEFT_ARROW || p.keyCode === p.RIGHT_ARROW || p.keyCode === p.UP_ARROW || p.keyCode === p.DOWN_ARROW ){
      value = 0;
      isKeyPressed = false;
    }
  };


};

var myp5 = new p5(s);

//Ui function
function centerCanvas(canvas) {
  var x = (myp5.windowWidth - myp5.width) / 2;
  var y = (myp5.windowHeight - myp5.height) / 2;
  canvas.position(x, y);
}

function Arrow(x,y,length,angle){
  myp5.push();
  myp5.translate(x,y);
  myp5.rotate(myp5.PI/angle);
  myp5.beginShape();
  myp5.vertex(0,-length);
  myp5.vertex(5*length,-length);
  myp5.vertex(5*length,-3*length);
  myp5.vertex(9*length,0);
  myp5.vertex(5*length,3*length);
  myp5.vertex(5*length,length);
  myp5.vertex(0,length);
  myp5.vertex(0,-length);
  myp5.endShape();
  myp5.pop();
}