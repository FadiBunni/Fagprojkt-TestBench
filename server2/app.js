var net = require('net');
var SerialPort = require('serialport');
var sp = new SerialPort('/dev/ttyMCC');

var socket = new net.Socket();
socket.connect(3000,'192.168.0.17', function() {
	console.log("Client: Connected to server");
	//socket.write('Hello, server! Love, Client.');
});

sp.on('open', function() {
	socket.on('data', function(data) {
		var message = data;
   
   	//console.log("Response from server: %s", data.response);
   	//socket.write(JSON.stringify({ response: "Hey there server!" }));
		//socket.end(); // kill client after server's response
		sp.write(message);
		console.log("data:"+ message + " has been sent");
	});
});

socket.on('close', function() {
	console.log('Connection closed');
	socket.destroy();
});

sp.on('data', function (data) {
	if(data){
  		//console.log('Data: ' + data);
	}
});


socket.on('close', function() {
	console.log('Connection closed');
	socket.destroy();
});