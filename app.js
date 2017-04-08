var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

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