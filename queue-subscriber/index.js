'use strict';

const api = require('@avimesa/group-api-amqp');

function queueSubscriber(){
    console.log("queue-subscriber");

	let apiKey = '';
	let apiPassword = '';

	if(!apiKey || !apiPassword){
		throw 'Please update the API Credentials above!'
	}

	api.setConnParams({
		apiKey: apiKey,
		apiPassword: apiPassword,
	});

    const rmqSettings = api.getRmqSettings();

    var queue = rmqSettings.queues.raw;

    var count = 0;
	api.consume(queue, function (err, msg, ack) {
	    if(err){
			console.log("Error");
        }
        else {
            // Ack this message, we got it
            ack(true);
			console.log(`Message ${count++}:`);
            console.log(msg);
        }
	});
}

queueSubscriber();
