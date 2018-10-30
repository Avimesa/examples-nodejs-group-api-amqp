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
    const rmqSettings = config.getRmqSettings();

    var queueName = rmqSettings.queues.raw;

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
                    console.log(err.message);
                    conn.close();
                }
                else{
                    ch.assertQueue(queueName, {exclusive : true}, function(err, q) {
                        if(err){
                            console.log(err.message);
                            conn.close();
                        }
                        else {
                            // subscribe...
                            ch.consume(q.queue, function(msg) {
                                // print message
                                console.log(" [x] %s", msg.content.toString());

                                if(sendAck){
                                    ch.ack(msg);
                                }
                            }, {noAck: !sendAck});
                        }
                    });
                }
            });
        }
    });
}

queueSubscriber();
