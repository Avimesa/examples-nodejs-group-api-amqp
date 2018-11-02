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
 * message-count
 *
 * @returns none
 */
function messageCount() {
    console.log("message-count");

    const connParams = config.getConnParams();
    const rmqSettings = config.getRmqSettings();

    const queueName = rmqSettings.queues.raw;

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
                    ch.checkQueue(queueName, function(err, q) {
                        if(err){
                            console.log(err.message);
                        } else {
                            console.log(`Found queue: ${q.queue}`);
                            console.log(`Message Count: ${q.messageCount}`);
                        }
                        conn.close();
                    });
                }
            });
        }
    });
}

messageCount();
