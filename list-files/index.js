'use strict';

const api = require('@avimesa/group-api-amqp');

function listFilesExample() {
	console.log("list-files");

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

	const devId = "00000000000000000000000000000000";

	api.listFiles(devId, function (err, files) {
		if (err) {
			console.log("Error");
		}
		else {
			for (var i = 0; i < files.length; i++) {
				console.log(files[i]);
			}
		}
	});
}

listFilesExample();
