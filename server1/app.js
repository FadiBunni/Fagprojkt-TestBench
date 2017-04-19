var sleep = require('system-sleep');
var net = require('net');

var server = net.createServer(function(conn) {
	console.log("Server: Client connected");

	conn.on("end", function(){
		console.log("Server: Client disconnected");

		server.close();
		process.exit(0);
	});

	var tick = 0;
	while(tick <= 3){
		conn.write("0");
		sleep(1000)
		conn.write("1");
		sleep(1000)
		conn.write("2");
		sleep(1000)
		if(tick === 3){
			conn.write("3");
		}
		tick += 1;
		console.log(tick)
	}
});

server.listen(3000, "192.168.0.107", function(){
    console.log("Server: Listening");
});