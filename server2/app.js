var net = require('net');
// var SerialPort = require('serialport');
// var sp = new SerialPort('/dev/ttyMCC');


var arduinosocket = new net.Socket();
arduinosocket.connect(55565,'192.168.100.11', function() {
console.log("Client: Connected to Arduino server");
 arduinosocket.write("m");
});

var PORT = 22205;
var HOST = '169.254.67.196';
var dgram = require('dgram');

var client = dgram.createSocket('udp4');
//var message = new Buffer("Hej fra UDOO");
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log('UDP message sent to ' + HOST +':'+ PORT);
//    client.close();
});
var listensocket = dgram.createSocket('udp4');
listensocket.on('listening', function(){
  var address = listensocket.address();
  console.log('UDP listening on ' + address.address + ':' + address.port);
});
listensocket.on('message', function (msg, rinfo) {
  console.log(rinfo.address + ':' + rinfo.port +' - ' + msg);
	arduinosocket.write(msg);
});
listensocket.bind(22205);
// client.bind(PORT,HOST);

// sp.on('open', function() {
// 	socket.on('data', function(data) {
// 		var message = data;
//
//    	//console.log("Response from server: %s", data.response);
//    	//socket.write(JSON.stringify({ response: "Hey there server!" }));
// 		//socket.end(); // kill client after server's response
// 		sp.write(message);
// 		console.log("data:"+ message + " has been sent");
// 	});
// });
//
// socket.on('close', function() {
// 	console.log('Connection closed');
// 	socket.destroy();
// });
//
// sp.on('data', function (data) {
// 	if(data){
//   		//console.log('Data: ' + data);
// 	}
// });

// arduinosocket.on('close', function() {
// 	console.log('Connection closed');
// 	arduinosocket.destroy();
// });
