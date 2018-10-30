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
 * queue-read-all example
 *
 * @returns none
 */
function queueReadAll(){
    console.log("queue-read-all");

    const connParams = config.getConnParams();
    const rmqSettings = config.getRmqSettings();

    // Specify queue name
    const queueName = rmqSettings.queues.raw;

    // After each message read, we're going to acknowledge it so it's popped from the queue on the server
    const sendAck = true;

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
                    // Let's make sure the queue is there
                    ch.checkQueue(queueName, function onCheckQueue(err){
                        if (null !== err) {
                            console.log(`Unable to resolve ${queueName}`);
                            conn.close();
                        }
                        console.log(`Resolved ${queueName}`);

                        // Get a message at a time and acknowledge
                        function getMessage() {
                            ch.get(queueName, {noAck : false}, function onGet(err, msg) {
                                if (err){
                                    console.log('Error with get - ' + queueName);
                                    ch.close();
                                    conn.close();
                                }
                                else if (!msg){
                                    console.log('No messages');
                                    ch.close();
                                    conn.close();
                                }
                                else {
                                    console.log(msg.content.toString());

                                    if (sendAck) {
                                        ch.ack(msg);
                                        console.log('message ackd - ' + queueName);
                                    }

                                    // recursive...
                                    getMessage();
                                }
                            });
                        }

                        // kick off recursive calls
                        getMessage();
                    });
                }
            });
        }
    });
}

queueReadAll();
