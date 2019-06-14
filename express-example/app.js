'use strict';

const avmsa_api = require('@avimesa/group-api-amqp');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors())
app.get('/', (req, res) => res.send(`{"date":${timestamp}, "val":${current_reading}}`));

//app.get('/', (req, res) => res.send(current_reading));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

let current_reading = null;
let timestamp = null;
let today = null;

let apiKey = '';
let apiPassword = '';

avmsa_api.setConnParams({
	apiKey: apiKey,
	apiPassword: apiPassword,
	hostname: 'rmqserv001.avimesa.com'
});

const rmqSettings = avmsa_api.getRmqSettings();
let queue = rmqSettings.queues.raw;

avmsa_api.purge(queue, function (err, count) {
	if (err) {
		console.log(`Error purging [${queue}]`);
	} else {
		console.log(`Purged [${queue}] - ${count} messages`);
	}
});

avmsa_api.consume(queue, function (err, msg, ack) {
	if (err) {
		console.log("Error");
	}
	else {
		// Ack this message, we got it
		ack(true);
		today = new Date();
		timestamp = today.getTime();
		current_reading = msg.dev.chans[0].ch_data[0].val;
	}
});
