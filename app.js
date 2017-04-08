var serialport = require('serialport');

var mySerial = new serialport('/dev/ttyMCC', {
	baudrate: 9600,
	flowContro: false,
	parser: serialport.parsers.readline("\r\n")
});

mySerial.on('open', function(){
	console.log("Port open");
});

mySerial.on('data', function(data){
	if(data){
		console.log("yay, we have data!");
	}
	console.log(data);
});