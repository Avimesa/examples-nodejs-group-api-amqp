'use strict';

const api = require('@avimesa/group-api-amqp');

function queueSubscriber(){
    console.log("queue-subscriber");

	let apiKey = '390e643448084f529e188109ac5606c3';
	let apiPassword = 'c51de31976c34cbfa1cef95d325ac996';

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
