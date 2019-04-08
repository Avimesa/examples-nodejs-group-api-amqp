'use strict';

const api = require('@avimesa/group-api-amqp');

function addDeviceExample() {
	console.log("add-device");

	let apiKey = '';
	let apiPassword = '';

	if(!apiKey || !apiPassword){
		throw 'Please update the API Credentials above!'
	}

	api.setConnParams({
		apiKey: apiKey,
		apiPassword: apiPassword,
	});

	// 32 char, 0-9a-f
	var deviceId = "";

	api.addDevice(deviceId, function (err, msg) {
		if (err) {
			console.log(`Error: ${msg}`);
		}
		else {
			console.log("Device Added!");
			console.log(`Device ID: ${deviceId}, Auth Key: ${msg}`);
		}
	});
}

addDeviceExample();
