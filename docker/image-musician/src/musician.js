var protocol = require ('./protocol'); 

var dgram = require ('dgram');

var server = dgram.createSocket('udp4');

function Play(instrument){

	function send(message){
		server.send(message, 0, message.length, protocol.PROTOCOL_PORT,
		 protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes){
	        console.log("Sending payload: " + sound + " via port " +
	        server.address().port + " and address " + server.address().address);
        });
	}

	switch(instrument){
	    case "piano" :
	        var sound = "ti-ta-ti";
	        break;
        case "trumpet" :
            var sound = "pouet";
            break;
        case "flute" :
            var sound = "trulu";
            break;
        case "vilolin" :
            var sound = "gzi-gzi";
            break;
        case "drum" :
            var sound = "boum-boum";
            break;
        default :
            throw 'Unknown instrument ! ';
	}

	message = new Buffer(sound);

	send(message);
	setInterval(send, 500, message);

}

var instrument = process.argv[2];

var musician = new Play(instrument);
