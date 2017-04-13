var SerialPort = require('serialport');
var sp = new SerialPort('/dev/ttyMCC');

sp.on('open', function() {
	setInterval(function(){
		setTimeout(function(){
			sp.write("0");
		},1000);
		console.log("hello!");
		sp.write("1");

	},1000);
});

sp.on('data', function (data) {
	if(data){
  		//console.log('Data: ' + data);
	}
});