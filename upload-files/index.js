/*
 * COPYRIGHT: This file and the source codes contained herein ("document") are
 * the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
 *
 * LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
 * limited license to use the source codes in this document as specified
 * in the Avimesa Open License:  http://avimesa.com/openlicense.txt
 */

'use strict';

const api = require('@avimesa/group-api-amqp');
const path = require('path');

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

	api.uploadScript(devId, scriptPath, function (err, msg) {
		if (err) {
			msg ? console.log(`${msg.status}`) : console.log('RMQ Connection Error');
		}
		else {
			console.log('Script uploaded OK');
		}
	});


	api.uploadConfig(devId, configPath, function (err, msg) {
		if (err) {
			msg ? console.log(`${msg.status}`) : console.log('RMQ Connection Error');
		}
		else {
			console.log('Config uploaded OK');
		}
	});
}

uploadFile();
