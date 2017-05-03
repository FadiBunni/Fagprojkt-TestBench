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


io.on('connection', function(socket){
	console.log('user connected: ', socket.id);
});


//////////////

var server = net.createServer(function(conn) {
	console.log("Server: Client connected");

	conn.on("end", function(){
		console.log("Server: Client disconnected");

		server.close();
		process.exit(0);
	});

	var tick = 0;
	while(tick <= 3){
		conn.write("0");
		sleep(1000)
		conn.write("1");
		sleep(1000)
		conn.write("2");
		sleep(1000)
		if(tick === 3){
			conn.write("3");
		}
		tick += 1;
		console.log(tick)
	}
});


//Enduroam changes the ip, remember to check. 
server.listen(3000, "10.16.175.201", function(){
    console.log("Server: Listening");
});