var net = require('net');

var arduino;

net.createServer(function (socket){
  arduino = socket;
  socket.on('data', function (data){
    console.log(data.toString());
  });
}).listen(55565);

var PORT = 22205;
var HOST = '169.254.67.200';
var dgram = require('dgram');

var client = dgram.createSocket('udp4');
var message = new Buffer("Hej fra UDOO");
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log('UDP message sent to ' + HOST +':'+ PORT);
});
client.on('listening', function(){
  var address = client.address();
  console.log('UDP listening on ' + address.address + ':' + address.port);
});
client.on('message', function (msg, rinfo) {
  console.log(rinfo.address + ':' + rinfo.port +' - ' + msg);
	arduino.write(msg);
});
/* Local code
var localclient = dgram.createSocket('udp4');
localclient.on('listening', function(){
  var address = localclient.address();
  console.log('UDP listening on ' + address.address + ':' + address.port);
});
localclient.on('message', function (msg, rinfo) {
  console.log(rinfo.address + ':' + rinfo.port +' - ' + msg);
	arduino.write(msg);
});
localclient.bind(22205); */
