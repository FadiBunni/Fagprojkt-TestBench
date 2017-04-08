var SerialPort = require('serialport');

var mySerial = new SerialPort('/dev/ttyMCC', {
	baudrate: 9600,
	parser: serialport.parsers.readline("\n")
});

mySerial.on('open', function(){
	console.log("Port open");
});

mySerial.on('data', function(data){
	console.log(data);
});