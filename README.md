# Avimesa Group API Examples, Node.js and AMQP
Group API examples using Node.js abd AMQP (0-9-1)

## Introduction

This project contains simple example of how to interface with the Avimesa Device Cloud's Group API using Node.js and AMQP.  Common tasks are captured in a simple example application to illustrate how one could go about interfacing withe system.


<a id="toc"></a>
## Table of Contents
- [1. Overview](#1.-overview)
- [2. Prerequisites](#2.-prerequisites)
- [3. Usage](#3.-usage)
- [4. Examples](#4.-examples)
    - [actuate-device](#actuate-device)
    - [admin-command-rpc](#admin-command-rpc)
    - [message-count](#message-count)
    - [queue-purge](#queue-purge)
    - [queue-read-all](#queue-read-all)
    - [queue-subscriber](#queue-subscriber)
    - [queue-temp-subscriber](#queue-subscriber)

<a id="1.-overview"></a>
## 1. Overview

[Top](#toc)<br>
<a id="2.-prerequisites"></a>
## 2. Prerequisites

- Node.js
- A valid Avimesa Device Cloud Group ID and Authentication Key

[Top](#toc)<br>
<a id="3.-usage"></a>
## 3. Usage

Checkout and initialize the project:

```
git clone https://github.com/Avimesa/examples-nodejs-group-api-amqp.git
cd examples-nodejs-group-api-amqp
npm init
```

Update the credentials in the .env file in the root of the project:

```
# RMQ Server Hostname
RMQ_HOSTNAME=rmqserv001.avimesa.com

# RMQ Server Port
RMQ_PORT=5672

# RMQ Group ID / Vhost
RMQ_GROUP_ID= *<TODO>*

# RMQ Authentication Key
RMQ_AUTH_KEY= *<TODO>*

# Set this to 0 to allow certless TLS
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Run the example from its directory, for example to run the `queue-subscriber` example, do ths following from the root of the project:

```
node queue-subscriber/index.js
```

[Top](#toc)<br>
<a id="4.-examples"></a>
## 4. Examples


<a id="actuate-device"></a>
### actuate-device

##### Summary:

Device actuation occurs by sending a command to the Device.  Because the device may be offline, a queue for the Device is available to cache the message.  The Device's queue is automatically configured by the Avimesa Device Cloud upon addition of the Device to the Group. 

To actuate a device, we send a JSON command to the `actuation.dx` exchange, and use a routing key that is the Device's ID (lower case, string based UUID, no hyphens).




<a id="admin-command-rpc"></a>
### admin-command-rpc

##### Summary:

The API supports a typical Remote Procedure Call (RPC) like interface for many of its commands.  In general, the logic goes like so:

- Create a temporary queue that the eventual response will be sent to.  Set a queue expiration time of 60 seconds to make sure it's cleaned up.
- Subscribe to this new queue
- Publish the command to the `admin.dx` exchange with routing key `in`, setting the `replyTo` option to the new queue name that we just created
- Process the response that is published to the subscriber and ack the message 

A command with a request ID is sent to the `admin.dx` exchange with a routing key of `in` and the message is routed to the `admin_in_q` queue.  The Avimesa Device Cloud processes the request, and responds to the queue that we specified in the request.

This example shows how one could request to list the Devices that belong to the Group.



[Top](#toc)<br>
<a id="message-count"></a>
### message-count

##### Summary:

Sometimes you want to see if there are any messages in a queue.  This example shows you how to do that.


[Top](#toc)<br>
<a id="queue-purge"></a>
### queue-purge

##### Summary:

It's possible that you will want to empty a queue, for example a device's actuation queue to clear any pending commands.

This example shows how to purge a queue.



[Top](#toc)<br>
<a id="queue-read-all"></a>
### queue-read-all

##### Summary:

The Avimesa Device Cloud comes with pre-configured queues such as `raw_q`, `not_q`, `admin_out_q` and `sys_log_q`.  These are required to serve as a (temporary) data store for messages and events.  Each queue is setup as exclusive, with the intention of a **single main consumer** that offloads the messages from the broker, into a database for permanent storage, and acknowledges the message to remove it from the queue.

This example shows a simple synchronous use case of the primary use of these queues, which is to have a single consumer offloading a queue exclusively.



[Top](#toc)<br>
<a id="queue-subscriber"></a>
### queue-subscriber

##### Summary:

This is the same as the `queue-read-all` example, but asynchronous in nature and using as subscriber instead of a reading the messages from the queue directly. 



[Top](#toc)<br>
<a id="queue-temp-subscriber"></a>
### queue-temp-subscriber

##### Summary:

Sometimes you want to 'listen' to a queue for live data passing through it, but not necessarily be responsible for handling the datastore.

This example shows how to create a temporary queue that will get data from the source of your choice by setting up a routing key.



## 4. Dependencies

```
amqplib
dotenv
```