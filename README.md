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
    - [actuate-device](#4.1-examples)
    - [list-devices](#4.3-examples)
    - [list-files](#4.4-examples)
    - [message-count](#4.5-examples)
    - [queue-purge](#4.6-examples)
    - [queue-subscriber](#4.7-examples)
    - [queue-temp-subscriber](#4.8-examples)
    - [upload-files](#4.9-examples)
    - [set-connection-params](#4.10-examples)


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

Update the API key and Password in the example:

```
let apiKey = '<** Enter API Key **>'; 
let apiPassword = '<** Enter API Password **>';

groupApi.setConnParams({
    apiKey: apiKey,
    apiPassword: apiPassword,
});
```

Run the example from its directory, for example to run the `queue-subscriber` example, do ths following from the root of the project:

```
node queue-subscriber/index.js
```

[Top](#toc)<br>
<a id="4.-examples"></a>
## 4. Examples


<a id="4.1-examples"></a>
### actuate-device

##### Summary:

Device actuation occurs by sending a command to the Device.  Because the device may be offline, a queue for the Device is available to cache the message.  The Device's queue is automatically configured by the Avimesa Device Cloud upon addition of the Device to the Group. 

To actuate a device, we send a JSON command to the `actuation.dx` exchange, and use a routing key that is the Device's ID (lower case, string based UUID, no hyphens).

This is all done for you by the `actuate` API, where you just pass in a Device ID and a JSON message. 



[Top](#toc)<br>
<a id="4.2-examples"></a>
### add-device

##### Summary:

This example shows how to add a Device to the Device Cloud.  The Device ID must be a 32 character string using a-f or 0-9 (i.e. base16 values for a UUID...).  It also must be unique in the Avimesa Device Cloud instance, so one could use a UUID generator to make the Device ID.

In response to a successful Device addition, you get a 32 character string (base16, UUID) authentication key.  

The combination of the Device ID and Authentication key can then be used by an Avimesa Device. 





[Top](#toc)<br>
<a id="4.3-examples"></a>
### list-devices

##### Summary:

An Avimesa Group contains Devices.  This example shows how to query for a list of devices.



[Top](#toc)<br>
<a id="4.4-examples"></a>
### list-files

##### Summary:

Each Device in the Avimesa Device Cloud has its own file system.  This will contain things like the device script, device config, DFU files, and any temporary files used by te script engine.

This example shows listing a devices files.



[Top](#toc)<br>
<a id="4.5-examples"></a>
### message-count

##### Summary:

Sometimes you want to see if there are any messages in a queue.  This example shows you how to do that.





[Top](#toc)<br>
<a id="4.6-examples"></a>
### queue-purge

##### Summary:

It's possible that you will want to empty a queue, for example a device's actuation queue to clear any pending commands.

This example shows how to purge a queue.






[Top](#toc)<br>
<a id="4.7-examples"></a>
### queue-subscriber

##### Summary:

This example consumes data from a queue.  When using the `consume` API, it's assumed that the user of this API is in charge of moving data to permanent storage.  Upon first connection, all pending messages are available.  This allows an application to go offline and not worry about data loss.





[Top](#toc)<br>
<a id="4.8-examples"></a>
### queue-temp-subscriber

##### Summary:

Sometimes you want to 'listen' to a queue for live data passing through it, but not necessarily be responsible for handling the datastore.

This example shows how to create a temporary queue that will get data from the source of your choice by setting up a routing key.





[Top](#toc)<br>
<a id="4.9-examples"></a>
### upload-files

##### Summary:

This example shows how one can upload a Device Driver Script and Device Configuration. 



[Top](#toc)<br>
<a id="4.10-examples"></a>
### set-connection-params

##### Summary:

This example shows how one can call a function to set connection params instead of using the .env file 




[Top](#toc)<br>
## 4. Dependencies

```
@avimesa/group-api-amqp
amqplib
dotenv
```
