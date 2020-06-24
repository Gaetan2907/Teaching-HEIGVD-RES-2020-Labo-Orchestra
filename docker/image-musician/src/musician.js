var protocol = require ('./protocol');

var dgram = require ('dgram');
var uuid = require('uuid');
var moment = require('moment');



var server = dgram.createSocket('udp4');

function Play(instrument){

	function send(uuid){

		var message = Buffer.from(JSON.stringify({
			uuid: uuid,
			sound: protocol.instruments.get(instrument),
			instrument: instrument,
			activeSince: moment().format()
		}))

		server.send(message, 0, message.length, protocol.PROTOCOL_PORT,
		 protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes){
	        console.log("Sending payload: " + protocol.instruments.get(instrument) + " via port " +
	        server.address().port + " and address " + server.address().address);
        });
	}

	setInterval(send, 500, uuid.v4());

}



var instrument = process.argv[2];

Play(instrument);
