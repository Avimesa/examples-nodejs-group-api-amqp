/*
 * COPYRIGHT: This file and the source codes contained herein ("document") are
 * the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
 *
 * LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
 * limited license to use the source codes in this document as specified
 * in the Avimesa Open License:  http://avimesa.com/openlicense.txt
 */

'use strict';

const config = require('./../config');
const amqp = require('amqplib/callback_api');

/**
 * actuate-device
 *
 * @returns none
 */
function actuateDevice() {
    console.log("actuate-device");

    const deviceId = "20010db800000000a28f7ffffe3558e1";
    console.log(`Using Device ID: ${deviceId}`);

    const connParams = config.getConnParams();
    const rmqSettings = config.getRmqSettings();

    const exchangeName = rmqSettings.exchanges.actuation;
    const routingKey = deviceId;

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

    // Connect to the server
    amqp.connect(connParams, function(err, conn) {
        if(err){
            console.log(err);
        }
        else{
            // Use a 'confirm channel' here so we can use a callback
            conn.createConfirmChannel(function(err, ch) {
                if (err){
                    console.log(err);
                    conn.close();
                }
                else {
                    ch.publish(exchangeName, routingKey, new Buffer(JSON.stringify(msg)), {}, function (err, ok) {
                        if(err){
                            console.log(err.message);
                        } else {
                            console.log('Message published OK!');
                        }
                        conn.close();
                    });
                }
            });
        }
    });
}

actuateDevice();
