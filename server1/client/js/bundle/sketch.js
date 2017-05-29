(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket = io();

socket.on('connected', 'hey');

var s = function(p) {

  var value = false;
  var direction = 0;

  p.setup = function() {
    //create canvas and center it
    var canvas = p.createCanvas(800, 800);
    centerCanvas(canvas);
    p.background(255);
    left = 0;
    right = 0;
  };

  p.draw = function() {

      p.fill(128,128,128);
      Arrow(340,390,10,1);
      Arrow(500,390,10,0);
    if(value === 0){
      p.fill(128,128,128);
      Arrow(340,390,10,1);
      Arrow(500,390,10,0);
    }else if(value === 1){
      p.fill(0,204,0);
      Arrow(340,390,10,1);
      direction += 1;
    }else if(value === 2){
      p.fill(0,204,0);
      Arrow(500,390,10,0);
      direction -= 1;
    }
    console.log(direction);
    //console.log(direction)
    if(direction >=50){
      direction = 50;
    }else if(direction <= -50){
      direction =-50;
    }
    socket.emit("getDirectionData",direction);
  };

  p.keyPressed = function(){
    if(p.keyCode ===  p.LEFT_ARROW){
      value = 1;
    }else if(p.keyCode === p.RIGHT_ARROW){
      value = 2;
    }
  };

  p.keyReleased = function(){
    if(p.keyCode ===  p.LEFT_ARROW || p.keyCode === p.RIGHT_ARROW ){
      value = 0;
      // direction = 0;
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
},{}]},{},[1]);
