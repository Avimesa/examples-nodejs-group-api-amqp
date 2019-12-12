'use strict';

const api = require('@avimesa/group-api-amqp');

function actuateDevice() {
    console.log("actuate-device");

	let apiKey = '';
	let apiPassword = '';

	if(!apiKey || !apiPassword){
		throw 'Please update the API Credentials above!'
	}

	api.setConnParams({
		apiKey: apiKey,
		apiPassword: apiPassword,
		hostname: 'queues.avimesacorp.net'
	});

    const deviceId = "20010db800000000a28f7ffffe3558e1";
    console.log(`Using Device ID: ${deviceId}`);

    const linuxTime = Math.floor(new Date() / 1000);
    const requestId = Math.round(Math.random() * 0xFFFFFFFF);

    const msg = {
        "api_maj" : 0,
        "api_min" : 11,
        "dts" : linuxTime,
        "dev" : {
            "dev_id" : deviceId,
            "dev_cmd" : {
                "dev_cmd_id" : 0xF002,
                "req_id" : requestId
            }
        }
    };

    console.log('Sending the following message: ' + JSON.stringify(msg));

    api.actuate(deviceId, msg, function (err) {
		if(err){
			console.log("Error");
		} else {
			console.log('Message published OK!');
		}
	});
}

actuateDevice();
