var net = require('net');
var dgram = require('dgram');
var PORT = 22205;
var HOST = '169.254.39.224';
var arduino;

net.createServer(function (socket){
  arduino = socket;
  socket.on('data', function (data){
    console.log(data.toString());
  });
}).listen(55565);

/*var client = dgram.createSocket('udp4');
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
});*/

var server = dgram.createSocket('udp4');
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

server.on('message', function (msg, rinfo) {
  console.log(rinfo.address + ':' + rinfo.port +' - ' + msg);
/*	var servercon = new Buffer("Hej fra UDOO","utf-8");
	server.send(servercon,rinfo.port,HOST,function(error){
  		if(error){
   		client.close();
   	}else{
   		console.log('Data sent !!!');
  		}
	});*/
	arduino.write(msg);
});
server.on('listening', function(){
  const address = server.address();
  console.log('UDP listening on ' + address.address + ':' + address.port);
});
server.bind(PORT); 
