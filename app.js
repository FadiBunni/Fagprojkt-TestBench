var SerialPort = require('serialport');
var sp = new SerialPort('/dev/ttyMCC');

sp.on('open', function() {
  sp.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written');
  });
  sp.write('Hello World');
});

// open errors will be emitted as an error event
sp.on('error', function(err) {
  console.log('Error: ', err.message);
});

sp.on('data', function (data) {
	if(data){
  		console.log('Data: ' + data);
	}
});