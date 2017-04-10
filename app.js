var SerialPort = require('serialport');
var sp = new SerialPort('/dev/ttyMCC');

sp.on('open', function() {
  sp.write(new Buffer('Hello World'));
});

sp.on('data', function (data) {
	if(data){
  		console.log('Data: ' + data);
	}
});