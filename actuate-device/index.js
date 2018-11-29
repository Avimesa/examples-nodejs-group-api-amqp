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


/**
 * actuate-device
 *
 * @returns none
 */
function actuateDevice() {
    console.log("actuate-device");

    const deviceId = "20010db800000000a28f7ffffe3558e1";
    console.log(`Using Device ID: ${deviceId}`);

    const linuxTime = Math.floor(new Date() / 1000);
    const requestId = Math.round(Math.random() * 0xFFFFFFFF);

    const msg = {
        "api_maj" : 0,
        "api_min" : 11,
        "dts" : linuxTime,
        "dev" : {
            "dev_id" : deviceId,
            "dev_cmd" : {
                "dev_cmd_id" : 0xF002,
                "req_id" : requestId
            }
        }
    };

    console.log('Sending the following message: ' + JSON.stringify(msg));

    api.actuate(deviceId, msg, function (err) {
		if(err){
			console.log("Error");
		} else {
			console.log('Message published OK!');
		}
	});
}

actuateDevice();
