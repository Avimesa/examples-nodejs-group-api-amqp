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

function listDevicesExample() {
	console.log("list-devices");

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
