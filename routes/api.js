const express = require('express')
// const { header } = require('express/lib/request')
const router = express.Router()
const EventSource = require('eventsource')
const request = require('request')
const config = require('../config/config.js')
const gatewayUrl = config.gatewayUrl

/* GET home page. */
router.get('/', function (req, res, next) {
  const url = gatewayUrl + '/gap/nodes?filter_rssi=-65&chip=0&active=1&event=1'
  const sse = new EventSource(url)
  sse.onerror = function (error) {
    console.log('open scan sse failed:', error)
  }

  sse.onmessage = function (message) {
    res.send(message)
    console.log(message)
  }
})

router.get('/scan', function (req, res, next) {
  const url = gatewayUrl + '/gap/nodes?filter_rssi=-65&chip=0&mac=&access_token=&active=1&event=1'
  const sse = new EventSource(url)
  sse.onerror = function (error) {
    console.log('open scan sse failed:', error)
  }

  sse.onmessage = function (message) {
    console.log(message)
  }
})

router.get('/connect/:macAddress/:chip', function (req, res, next) {
  try {
    const macAddress = req.params.macAddress
    const chip = req.params.chip
    // const url = 'http://192.168.40.1/gap/'+macAddress+'/connection?chip='+chip;
    const options = {
      method: 'POST',
      url: gatewayUrl + '/gap/nodes/' + macAddress + '/connection/?chip=' + chip,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ timeout: 5000, type: 'random' })

    }
    request(options, function (error, response) {
      if (error) console.error(error)
      else {
        console.log(options.url)
        res.send({ status: 200, data: response.body })
      }
    })
  } catch (error) {
    res.send(error)
  }
})

router.get('/read/:macAddress/:handle', function (req, res, next) {
  try {
    const macAddress = req.params.macAddress
    const handle = req.params.handle
    // const url = 'http://192.168.40.1/gap/'+macAddress+'/connection?chip='+chip;
    const options = {
      method: 'GET',
      url: gatewayUrl + '/api/gatt/nodes/' + macAddress + '/handle/' + handle + '/value?mac=&access_token=',
      headers: {
      }
    }
    request(options, function (error, response) {
      if (error) console.error(error)
      else {
        console.log(response.body)
        res.send(response.body)
      }
    })
  } catch (error) {
    res.send(error)
  }
})

router.get('/write/:macAddress/:handle/:value', function (req, res, next) {
  try {
    const macAddress = req.params.macAddress
    const handle = req.params.handle
    const value = req.params.handle
    // const url = 'http://192.168.40.1/gap/'+macAddress+'/connection?chip='+chip;
    const options = {
      method: 'GET',
      url: gatewayUrl + '/api/gatt/nodes/' + macAddress + '/handle/' + handle + '/value/' + value + '?mac=&access_token=',
      headers: {
      }
    }
    request(options, function (error, response) {
      if (error) console.error(error)
      else {
        console.log(response.body)
        res.send(response.body)
      }
    })
  } catch (error) {
    res.send(error)
  }
})

router.get('/disconnect/:macAddress', function (req, res, next) {
  const macAddress = req.params.macAddress
  // const url = 'http://192.168.40.1/gap/'+macAddress+'/connection?chip='+chip;
  const options = {
    method: 'DELETE',
    url: gatewayUrl + '/gap/nodes/' + macAddress + '/connection?mac=&access_token=',
    headers: {
    }
  }
  request(options, function (error, response) {
    if (error) console.error(error)
    else {
      console.log(response.body)
      res.send(response.body)
    }
  })
})

router.get('/openNotification', function (req, res, next) {
  const url = gatewayUrl + '/api/gatt/nodes?mac=&access_token=&event=1'

  const sse = new EventSource(url)

  sse.onerror = function (error) {
    console.log('open notify sse failed:', error)
  }

  sse.onmessage = function (message) {
    console.log('recevied notify sse message:', message)
  }
})

router.get('/connectionState', function (req, res, next) {
  const url = gatewayUrl + '/gap/nodes?&connection_state=connected'

  const options = {
    method: 'GET',
    url: url,
    headers: {
    }
  }
  request(options, function (error, response) {
    if (error) console.error(error)
    else {
      console.log(response)
      res.send(response.body)
    }
  })
})

router.get('/pair/:macAddress/:ioCapability', function (req, res, next) {
  const macAddress = req.params.macAddress
  const ioCapability = req.params.ioCapability

  const options = {
    method: 'POST',
    url: gatewayUrl + '/api/management/nodes/' + macAddress + '/pair/?mac=&access_token=',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ iocapability: ioCapability })
  }
  request(options, function (error, response) {
    if (error) console.error(error)
    else {
      console.log(response.body)
      res.send(response.body)
    }
  })
})

router.get('/pairInput/:macAddress/:passkey', function (req, res, next) {
  const macAddress = req.params.macAddress
  const passkey = req.params.passkey

  const options = {
    method: 'POST',
    url: gatewayUrl + '/api/management/nodes/' + macAddress + '/pair-input/?mac=&access_token=',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ passkey: passkey })
  }
  request(options, function (error, response) {
    if (error) console.error(error)
    else {
      console.log(response.body)
      res.send(response.body)
    }
  })
})

router.get('/unpair/:macAddress', function (req, res, next) {
  const macAddress = req.params.macAddress
  const request = require('request')
  const options = {
    method: 'DELETE',
    url: 'http://192.168.1.8/api/management/nodes/' + macAddress + '/bond/?mac=&access_token=',
    headers: {
    }
  }
  request(options, function (error, response) {
    if (error) console.error(error)
    else {
      console.log(response.body)
      res.send(response.body)
    }
  })
})

module.exports = router
