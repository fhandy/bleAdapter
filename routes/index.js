const express = require('express')
const { header } = require('express/lib/request')
const router = express.Router()
const EventSource = require('eventsource')
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
    console.log(message)
  }
})

module.exports = router
