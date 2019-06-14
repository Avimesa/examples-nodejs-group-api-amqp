# Example Temperature Application Using Node and Express
Updated June 14, 2019

## Introduction


This tutorial will walk you through the steps of getting temperature data from an Avimesa 1000 with a 4-20 mA temperature sensor, then setting up a simple chart to view the live date. For this tutorial, we'll use our local machine to run the app, but you're free to use any web server with Node.js. When we're done you should end up with a chart similar to the one below.

<img src="https://avimesa.com/wp-content/uploads/2019/06/IoT-temperature-chart-2.jpg" alt="IoT Temperature Chart" />

<strong>Pre-requisites: </strong>
<ul>
<li><a href="https://shop.avimesa.com/collections/avimesa-hardware/products/avimesa-1000" rel="noopener" target="_blank">Avimesa 1000 Device</a></li>
<li><a href="https://shop.avimesa.com/collections/avimesa-hardware/products/avimesa-gateway" rel="noopener" target="_blank">Avimesa WiFi Gateway</a> or <a href="https://shop.avimesa.com/collections/iot-kits/products/avimesa-systech-cellular-iot-kit" rel="noopener" target="_blank">Systech SL-600 Gateway</a></li>
<li><a href="https://avimesa.com/pricing/">Avimesa Device Cloud Subscription</a></li>
<li><a href="https://www.automationdirect.com/adc/shopping/catalog/process_control_-a-_measurement/temperature_sensors_-a-_transmitters/temperature_transmitters_(integral_sensor)/xtp25n-030-0100c?gclid=Cj0KCQjwxYLoBRCxARIsAEf16-sXauapLQiuSAo-zjVb1voargIQNvacooIPxL0Wnmjy9t43lJfRCaIaAkwkEALw_wcB" rel="noopener" target="_blank">ProSense XTP25N temperature sensor</a></li>
<li><a href="https://avimesa.com/demos/line-chart/temperature-app.zip">Project files</a></li>
<li>Ability to run Node.js via localhost or remote web server</li>
</ul>

Some of these items are available for purchase separately in our <a href="https://shop.avimesa.com" rel="noopener" target="_blank">online store</a> and we also have an <a href="https://shop.avimesa.com/collections/iot-kits/products/avimesa-systech-cellular-iot-kit" rel="noopener" target="_blank">IoT kit</a> which includes 90 days of cloud services and everything used in this tutorial.
 

Assuming you already have the Avimesa 1000 and a compatible gateway powered on and connected to the network, and the temperature sensor connected to the 1000, please proceed to Step 1. The Avimesa 1000 should be already provisioned and listed in your devices at `app.avimesa.com`. 

User guide for the Avimesa 1000 can be found at: <a href="https://github.com/Avimesa/user-guide-avimesa-1000">https://github.com/Avimesa/user-guide-avimesa-1000</a>

For instructions on setting up the Avimesa WiFi Gateway please see this document: <a href="https://github.com/Avimesa/user-guide-avimesa-gateway-for-rpi">https://github.com/Avimesa/user-guide-avimesa-gateway-for-rpi</a>

We also recommend checking out our video tutorials at: <a href="https://avimesa.com/resources/videos/">https://avimesa.com/resources/videos/</a>

Note: When connecting the 4-20 mA sensor to the Avimesa 1000, the wiring order for each channel from left to right should be BLACK - BROWN - BLUE. 


### Step 1 - Configuring the Avimesa 1000

First, <a href="https://avimesa.com/demos/line-chart/temperature-app.zip">click here</a> to download the project files for this demo if you haven't already. Unzip the file and place the folder in the root directory for localhost on your machine. On MacOS it's usually the `Sites` folder, but it can be called anything depending on how it was set up. If you're unsure if your machine has a localhost you can do a web search for `setting up localhost`. If you're using MacOS, <a href="https://websitebeaver.com/set-up-localhost-on-macos-high-sierra-apache-mysql-and-php-7-with-sslhttps">this article is pretty thorough</a>. No need to enable PHP and MySQL for this tutorial. Simply starting Apache and enabling your `Sites` folder is enough. 

Now let's log in to your Avimesa Device Cloud account at <a href="https://app.avimesa.com">https://app.avimesa.com</a>

In the upper right corner, click on your `username` then on `View Devices`

Click `Configure` next to the Avimesa 1000 device that you will be using for this demo

Click `Upload Script` then navigate to the folder with files you downloaded, then to the `scripts` subfolder and upload `script.js`.

Next click `Upload Config` and upload the `config.json` script from the same folder.

Your Avimesa 1000 is now configured to use the ProSense XTP25N temperature sensor.

### Step 2 - Node, Express, and Avimesa Group API

#### Node.js

If you don't already have Node.js installed, please visit <a href="https://nodejs.org/en/" target="_blank">https://nodejs.org/en/</a> for instructions on installing Node.js

To check if you have Node.js installed open a Terminal window and type `node -v` and hit `Enter`. If Node is installed you should see a version number like `v10.15.3` returned.

#### Express.js

Once you have Node running we can now install <a href="https://expressjs.com/" rel="noopener" target="_blank">Express.js</a>. Express is a Node.js framework that makes it easier to create web applications.

Open a Terminal window and type the following commands:

```
mkdir temperature-app
cd temperature-app
```

Use the npm init command to create a package.json file for your application. 

```
npm init
```

This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

```
entry point: (index.js)
```

Enter app.js and hit RETURN to accept the new file name.

Now install Express in the temperature-app directory and save it in the dependencies list. For example:

```
npm install express --save
```
To install Express temporarily and not add it to the dependencies list:

```
$ npm install express --no-save
```
Now we'll install CORS. Type the following on the command line:

```
$ npm install cors
```
CORS gives permission to a web application to access resources from another location. For example, we'll serve our Node application from http://localhost:8080 using Express, then access it from http://localhost. More info can be found at: https://www.codecademy.com/articles/what-is-cors

#### Avimesa Group API

Now, we can install the Avimesa Group API files. Type the following command and hit RETURN:

```
npm install @avimesa/group-api-amqp
```


### Step 3 - The Node.js application

Grab the app.js sample file from your project files and place it in the `temperature-app` directory. Now we'll open the file in a text editor and insert your API key and password. To find your API key and password, go to https://app.avimesa.com and in the upper-right corner click on `Account` then `Settings` in the drop-down menu. You'll see your API key and password listed under the Subscription section. Copy your API key.

Look for the following lines in app.js:

```
let apiKey = '';
let apiPassword = '';
```

Paste your API key between the single quotes.

Do the same for the API password. The lines should now look something like this:

```
let apiKey = '00000000000000000000000000000000';
let apiPassword = '00000000000000000000000000000000';
```
Now, look for the following line:

```
current_reading = msg.dev.chans[0].ch_data[0].val;
```

Depending on which channel your sensor is connected to on the Avimesa 1000, the number in `msg.dev.chans[0]` may need to be changed. Channels 1-7 on the board from left to right are represented as `'0'-'1'-'2'-'3'-'4'-'5'-'6'` in the code, so channel 1 will actually be `0`. For example, if your sensor is connected to channel 1 (the far left terminal), then that line of code will look like `current_reading = msg.dev.chans[0].ch_data[0].val;`. If connected to channel 2, then it will be `current_reading = msg.dev.chans[1].ch_data[0].val;` and so on.

<img src="https://avimesa.com/wp-content/uploads/2019/06/avimesa-1000-channels.jpg" alt="Avimesa 1000 channels" class="aligncenter" />

Make the necessary adjustments if needed and save the file.

**Note: When connecting the 4-20 mA sensor to the Avimesa 1000, the wiring order for each channel from left to right should be BLACK - BROWN - BLUE.**

<img src="https://avimesa.com/wp-content/uploads/2019/06/avimesa-1000-terminal-connection-order.jpg" alt="Avimesa 1000 terminal connection order" class="aligncenter" />

Next, open a Terminal window, navigate to your `temperature-app` directory and type the following command and hit Enter.

```
node app.js
```

Open a browser window and go to `http://localhost:8080`

You should now see data in JSON format which should look something like this:

```
{"data_idx":0,"units":1,"val":71.37}
```


### Step 4 - Charting the data

Now that we have data flowing we can plug it into our the Javascript app. In this example we'll use a dynamic line chart from amCharts which automatically updates at a set interval.

Make sure the chart.html file is in the `temperature-app` directory, then in a browser window go to `http://localhost/temperature-app/chart.html`. Wait a few seconds and you should see the chart magically update right before your eyes.

More info on configuring the chart can be found at <a href="https://www.amcharts.com/demos/#line-area" rel="noopener" target="_blank">https://www.amcharts.com/demos/#line-area</a>
