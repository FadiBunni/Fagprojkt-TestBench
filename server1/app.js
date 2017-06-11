const sleep = require('system-sleep');
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
});

////////////
var server = net.createServer(function(conn) {
	console.log("Server: Client connected");

	conn.on("end", function(){
		console.log("Server: Client disconnected");
		server.close();
		process.exit(0);
	});

	setInterval(function(){
		if(direction != undefined){
			console.log(direction);
			conn.write(direction.toString());
		}
	},120);

});

//Enduroam changes the ip, remember to check. 
server.listen(3000, "10.0.0.11", function(){
    console.log("Server: Listening");
});