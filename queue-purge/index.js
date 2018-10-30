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
 * queue-subscriber example
 *
 * @returns none
 */
function queueSubscriber(){
    console.log("queue-subscriber");

    const connParams = config.getConnParams();

    // We're going to purge a device's queue (its actuation queue)
    const deviceId = "00000000000000000000000000000000";
    const queueName = `${deviceId}_q`;

    console.log(`Using Device ID: ${deviceId}`);

    // Connect to the server
    amqp.connect(connParams, function(err, conn) {
        if(err){
            console.log(err);
        }
        else{
            conn.createChannel(function(err, ch) {
                if (err){
                    console.log(err);
                    conn.close();
                }
                else{
                    ch.purgeQueue(queueName, function (err, resp) {
                        if (err){
                            console.log(err.message);
                        }
                        else {
                            console.log('purged ${resp.messageCount} messages');
                        }
                        conn.close();
                    });
                }
            });
        }
    });
}

queueSubscriber();
