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