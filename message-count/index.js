'use strict';

const api = require('@avimesa/group-api-amqp');

/**
 * message-count
 *
 * @returns none
 */
function messageCount() {
    console.log("message-count");

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
    const queue = rmqSettings.queues.raw;

    api.count(queue, function (err, count) {
		if(err){
			console.log("Error");
		}
		else {
			console.log(`Message count: ${count}`);
		}
	});
}

messageCount();
