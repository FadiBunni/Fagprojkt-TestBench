var SerialPort = require('serialport');
var sp = new SerialPort('/dev/ttyMCC');

sp.on('open', function() {
	setTimeout(function(){
		sp.write("hello");
	},1000);
});

sp.on('data', function (data) {
	if(data){
  		console.log('Data: ' + data);
	}
});