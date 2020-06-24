
const protocol = require('./protocol');


const dgram = require('dgram');
const net = require('net');
const s = dgram.createSocket('udp4');
const moment = require('moment');

const port = 2205;

s.bind(protocol.PROTOCOL_PORT, function() {
  console.log("Joining multicast group");
  s.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

var musicians = new Map()

s.on('message', function(msg, source) {
	console.log("Data has arrived: " + msg + ". Source port: " + source.port);
  var input = JSON.parse(msg.toString());
  var musician={
    instrument: input.instrument,
    sound: input.sound,
    activeSince: input.activeSince
  }
  musicians.set(input.uuid, musician)
});

function checkActiveMusician(){
  for(var[uuid, musician] of musicians.entries()){
    if(moment().diff(moment(musician.activeSince), 'seconds') > 5){
      musicians.delete(uuid);
    }
  }
}

setInterval(checkActiveMusician, 500);

const TCPServer = new net.Server();

TCPServer.listen(port, function(){
  console.log('Server listen for tcp connection on port ${port}');
});

TCPServer.on('connection', function(socket){
  console.log('new connection established');

  var output = [];

  for(var[uuid, musician] of musicians.entries()){
    output.push({
      uuid: uuid,
      instrument: musician.instrument,
      activeSince: musician.activeSince
    });
  }

  socket.write(JSON.stringify(output));
  socket.end();
});
