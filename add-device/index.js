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

function addDeviceExample() {
	console.log("add-device");

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
