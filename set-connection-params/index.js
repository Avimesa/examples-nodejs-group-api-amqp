'use strict';

const api = require('@avimesa/group-api-amqp');

function setConnectionParams() {
	console.log("set-connection-params");

	var params1 = {
		hostname: 'rmqserv001.avimesa.com',
		port: 5671,
		vhost: '00001111222244440000111122224444',
		username: '00001111222244440000111122224444',
		password: 'aaaabbbbccccddddaaaabbbbccccdddd',
	};
	api.setConnParams(params1);
	console.log(api.getConnParams());
}

setConnectionParams();
