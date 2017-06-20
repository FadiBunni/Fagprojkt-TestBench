const net = require('net');
const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);
const path    = require('path');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static(path.join(__dirname + '/client')));

const port = process.env.PORT || 2000;
http.listen(port,function(){
	console.log('Server started: http://localhost:2000/');
});

var direction;
var isKeyPressed;
var motordirection;

io.on('connection', function(socket){
	console.log('user connected: ', socket.id);

	socket.on("getDirectionData", function(data){
		//console.log(data);
		direction = data;
	});
	socket.on("isKeyPressed", function(data){
		//console.log(data);
		isKeyPressed = data;
	});
	socket.on("getMotorData", function(data){
		motordirection = data;
	});
});

var PORT = 22205;
var HOST = '169.254.100.2';

var dgram = require('dgram');

var client = dgram.createSocket('udp4');

var olddirection = 90;
var oldmotor = 0;

client.on('message', function (msg, rinfo) {
	console.log(msg.toString());
});
setInterval(function(){

	if(direction != undefined && olddirection != direction){
		console.log("d" + direction);
		var message = new Buffer("d" + direction.toString());
		client.send(message, PORT, HOST, function(err) {
			if (err) throw err;
			console.log('UDP message sent to ' + HOST +':'+ PORT);
		});
		olddirection = direction;
	}
	if(motordirection != undefined && oldmotor != motordirection){
		console.log("m" + motordirection);
		var message = new Buffer("m" + motordirection.toString());
		client.send(message, PORT, HOST, function(err) {
			if (err) throw err;
			console.log('UDP message sent to ' + HOST +':'+ PORT);
		});
		oldmotor = motordirection;
	}
},500);

