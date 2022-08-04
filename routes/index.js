var express = require('express');
const { header } = require('express/lib/request');
var router = express.Router();
const axios = require('axios').default;
const EventSource = require('eventsource');
var request = require('request');
const gatewayUrl = 'http://192.168.1.8'

/* GET home page. */
router.get('/', function(req, res, next) {
  const url = 'http://192.168.1.200/gap/nodes?filter_rssi=-65&chip=0&active=1&event=1';
  const sse = new EventSource(url);
  sse.onerror = function(error) {
    console.log('open scan sse failed:', error);
  };
  
  sse.onmessage = function(message) {
  console.log(message)
  };
});



module.exports = router;
