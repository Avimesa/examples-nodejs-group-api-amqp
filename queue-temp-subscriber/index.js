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
const config = require('./../config');


/**
 * queue-temp-subscriber example
 *
 * @returns none
 */
function queueTemporarySubscriber(){
    console.log("queue-temp-subscriber");

    const rmqSettings = config.getRmqSettings();

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
