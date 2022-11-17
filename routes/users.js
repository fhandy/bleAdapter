const express = require('express')
const { header } = require('express/lib/request')
const router = express.Router()
const axios = require('axios').default
const EventSource = require('eventsource')

/* GET home page. */
router.get('/', function (req, res, next) {
  const url = 'http://192.168.40.1/gap/nodes?filter_rssi=-65&chip=0&active=1&event=1'
  const sse = new EventSource(url)
  sse.onerror = function (error) {
    console.log('open scan sse failed:', error)
  }

  sse.onmessage = function (message) {
  //   res.setHeader('Cache-Control', 'no-cache');
  //   res.setHeader('Content-Type', 'text/event-stream');
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Connection', 'keep-alive');
  //   res.flushHeaders(); // flush the headers to establish SSE with client

    //   let counter = 0;
    //   let interValID = setInterval(() => {
    //       counter++;
    //       if (counter >= 10) {
    //           clearInterval(interValID);
    //           res.end(); // terminates SSE session
    //           return;
    //       }
    //       res.write(`data: ${JSON.stringify(message)}\n\n`); // res.write() instead of res.send()
    //   }, 1000);
    //   res.on('close', () => {
    //     console.log('client dropped me');
    //     clearInterval(interValID);
    //     res.end();
    // });
    console.log(message)
  }
})

router.get('/scan', function (req, res, next) {
  const url = 'http://192.168.40.1/gap/nodes?filter_rssi=-65&chip=0&active=1&event=1'
  const sse = new EventSource(url)
  sse.onerror = function (error) {
    console.log('open scan sse failed:', error)
  }

  sse.onmessage = function (message) {
  //   res.setHeader('Cache-Control', 'no-cache');
  //   res.setHeader('Content-Type', 'text/event-stream');
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Connection', 'keep-alive');
  //   res.flushHeaders(); // flush the headers to establish SSE with client

    //   let counter = 0;
    //   let interValID = setInterval(() => {
    //       counter++;
    //       if (counter >= 10) {
    //           clearInterval(interValID);
    //           res.end(); // terminates SSE session
    //           return;
    //       }
    //       res.write(`data: ${JSON.stringify(message)}\n\n`); // res.write() instead of res.send()
    //   }, 1000);
    //   res.on('close', () => {
    //     console.log('client dropped me');
    //     clearInterval(interValID);
    //     res.end();
    // });
    console.log(message)
  }
})

router.post('/connect/:macAddress/:chip', async function (req, res, next) {
  try {
    const macAddress = req.params.macAddress
    const chip = req.params.chip
    const url = 'http://192.168.40.1/gap/' + macAddress + '/connection?chip=' + chip
    // const sse = new EventSource(url);
    const headers = {
      'Content-Type': 'application/json'
    }
    const connection = await axios.post(url, headers)
    console.log(connection)
    res.send(connection.body)
  } catch (error) {
    console.log(error)
  }
})

router.get('/read/:maccAddress/', async function (req, res, next) {
  try {
    if (req.query) {
      const macAddress = req.params.macAddress
      const chip = req.params.chip
      const url = 'http://192.168.40.1/gatt/nodes/' + macAddress + '/handle/' + req.query.handle + '/value?'
      // const sse = new EventSource(url);
      const headers = {
        'Content-Type': 'application/json'
      }
      const connection = await axios.get(url, headers)
      console.log(connection)
      res.send(connection.body)
    } else {
      res.send('No Query Handle on Request')
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/write/:type', async function (req, res, next) {
  try {
    if (req.body.macAddress && req.body.handle && req.body.value) {
      const type = req.params.type
      const macAddress = req.body.macAddress
      const handle = req.body.handle
      const value = req.body.value
      const url = 'http://192.168.40.1/gatt/nodes/' + macAddress + '/handle/' + handle + '/value/' + value
      // const sse = new EventSource(url);
      const headers = {
        'Content-Type': 'application/json'
      }
      const connection = await axios.get(url, headers)
      console.log(connection, type)
      res.send(connection.body).statusCode(200)
    } else {
      res.statusCode(404).send('Field Not Completed')
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/delete/:macAddress', async function (req, res, next) {
  try {
    if (req.params.macAddress) {
      const macAddress = req.params.macAddress
      const url = 'http://192.168.40.1/gap/nodes/' + macAddress + '/connection?'
      // const sse = new EventSource(url);
      const headers = {
        'Content-Type': 'application/json'
      }
      const connection = await axios.delete(url, headers)
      console.log(connection, type)
      res.send(connection.body).statusCode(200)
    } else {
      res.statusCode(404).send('Wrong address')
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/getDeviceConnected', async function (req, res, next) {
  try {
    const url = 'http://192.168.40.1/gap/nodes?&connection_state=connected'
    const headers = {
      'Content-Type': 'application/json'
    }
    const connection = await axios.get(url, headers)
    console.log(connection, type)
    res.send(connection.body).statusCode(200)
  } catch (error) {
    console.log(error)
  }
})

router.get('/deviceServices/:macAddress', async function (req, res, next) {
  try {
    const macAddress = req.params.macAddress
    const url = 'http://192.168.40.1/gatt/nodes/' + macAddress + '/services/characteristics/descriptors?'
    const headers = {
      'Content-Type': 'application/json'
    }
    const connection = await axios.get(url, headers)
    console.log(connection, type)
    res.send(connection.body).statusCode(200)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
