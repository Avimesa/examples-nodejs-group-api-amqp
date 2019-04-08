'use strict';

const api = require('@avimesa/group-api-amqp');

function purgeQueue() {
	console.log("queue-purge");

	const rmqSettings = api.getRmqSettings();
	const queue = '390e643448084f520000000000000001_q';//rmqSettings.queues.raw;

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
