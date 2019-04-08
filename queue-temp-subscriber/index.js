'use strict';

const api = require('@avimesa/group-api-amqp');

function queueTemporarySubscriber(){
    console.log("queue-temp-subscriber");

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

    const exchangeName = rmqSettings.exchanges.data;
    const routingKey = rmqSettings.routingKeys.raw;

    api.listen(exchangeName, routingKey, function (err, msg) {
		if(err){
			console.log("Error");
		} else {
			console.log(msg);
		}
	});
}

queueTemporarySubscriber();
