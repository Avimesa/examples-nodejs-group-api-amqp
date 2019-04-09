'use strict';

const api = require('@avimesa/group-api-amqp');

function purgeQueue() {
	console.log("queue-purge");

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

	api.purge(queue, function (err, count) {
		if (err) {
			console.log(`Error purging [${queue}]`);
		}
		else {
			console.log(`Purged [${queue}] - ${count} messages`);
		}
	});
}

purgeQueue();
