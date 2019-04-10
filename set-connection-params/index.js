'use strict';

const api = require('@avimesa/group-api-amqp');

function setConnectionParams() {
	console.log("set-connection-params");

	let apiKey = '';
	let apiPassword = '';

	if(!apiKey || !apiPassword){
		throw 'Please update the API Credentials above!'
	}

	api.setConnParams({
		apiKey: apiKey,
		apiPassword: apiPassword,
		hostname: 'rmqserv001.avimesa.com'
	});

	console.log(api.getConnParams());
}

setConnectionParams();
