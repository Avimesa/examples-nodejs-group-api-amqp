'use strict';

const api = require('@avimesa/group-api-amqp');

function listDevicesExample() {
	console.log("list-devices");

	let apiKey = '';
	let apiPassword = '';

	if(!apiKey || !apiPassword){
		throw 'Please update the API Credentials above!'
	}

	api.setConnParams({
		apiKey: apiKey,
		apiPassword: apiPassword,
	});

	api.listDevices(function (err, devices) {
		if (err) {
			console.log("Error");
		}
		else {
			for (var i = 0; i < devices.length; i++) {
				console.log(devices[i]);
			}
		}
	});
}

listDevicesExample();
