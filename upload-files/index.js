'use strict';

const api = require('@avimesa/group-api-amqp');
const path = require('path');
const fs = require('fs');

const devId = "20010db800000000a28f7ffffe3558e1";
const scriptPath = path.join(__dirname, '..', 'files', 'script.js');
const configPath = path.join(__dirname, '..', 'files', 'config.json');

/**
 * upload-file example
 *
 * @returns none
 */
function uploadFile() {
	console.log("upload-file");

	let scriptBuf = fs.readFileSync(scriptPath);
	api.uploadScript(devId, scriptBuf, function (err, msg) {
		if (err) {
			msg ? console.log(`${msg.status}`) : console.log('RMQ Connection Error');
		}
		else {
			console.log('Script uploaded OK');
		}
	});

	let configBuf = fs.readFileSync(configPath);
	api.uploadConfig(devId, configBuf, function (err, msg) {
		if (err) {
			msg ? console.log(`${msg.status}`) : console.log('RMQ Connection Error');
		}
		else {
			console.log('Config uploaded OK');
		}
	});
}

uploadFile();
