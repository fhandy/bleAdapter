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

router.get('/scan', function(req, res, next) {
  const url = 'http://192.168.40.1/gap/nodes?filter_rssi=-65&chip=0&mac=&access_token=&active=1&event=1';
  const sse = new EventSource(url);
  sse.onerror = function(error) {
    console.log('open scan sse failed:', error);
  };
  
  sse.onmessage = function(message) {
  console.log(message)
  };
});

router.get('/connect/:macAddress/:chip', function(req, res, next) {
  const macAddress = req.params.macAddress
  const chip = req.params.chip
  // const url = 'http://192.168.1.200/gap/'+macAddress+'/connection?chip='+chip;
  var options = {
    'method': 'POST',
    'url': gatewayUrl + `/api/gap/nodes/`+macAddress+`/connection?mac=&access_token=&`+chip,
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"timeout":5000,"type":"public"})
  
  };
  request(options, function (error, response) { 
    if (error) console.error(error);
    else {
      console.log(response.body);
      res.send(response.body)
    }
  });
});

router.get('/read/:macAddress/:handle', function(req, res, next) {
  const macAddress = req.params.macAddress
  const handle = req.params.handle
  // const url = 'http://192.168.1.200/gap/'+macAddress+'/connection?chip='+chip;
  var options = {
    'method': 'GET',
    'url': gatewayUrl + `/api/gatt/nodes/`+macAddress+`/handle/`+handle+`/value?mac=&access_token=`,
    'headers': {
    }
  };
  request(options, function (error, response) { 
    if (error) console.error(error);
    else {
      console.log(response.body)
      res.send(response.body)
    }
  });
});

router.get('/write/:macAddress/:handle/:value', function(req, res, next) {
  const macAddress = req.params.macAddress
  const handle = req.params.handle
  const value = req.params.handle
  // const url = 'http://192.168.1.200/gap/'+macAddress+'/connection?chip='+chip;
  var options = {
    'method': 'GET',
    'url': gatewayUrl + `/api/gatt/nodes/`+macAddress+`/handle/`+handle+`/value/`+value+`?mac=&access_token=`,
    'headers': {
    }
  };
  request(options, function (error, response) { 
    if (error) console.error(error);
    else {
      console.log(response.body)
      res.send(response.body)
    }
  });
});

router.get('/disconnect/:macAddress', function(req, res, next) {
  const macAddress = req.params.macAddress
  // const url = 'http://192.168.1.200/gap/'+macAddress+'/connection?chip='+chip;
  var options = {
    'method': 'DELETE',
    'url': gatewayUrl + `/api/gap/nodes/`+macAddress+`/connection?mac=&access_token=`,
    'headers': {
    }
  };
  request(options, function (error, response) { 
    if (error) console.error(error);
    else {
      console.log(response.body)
      res.send(response.body)
    }
  });
});

router.get('/openNotification', function(req, res, next) {
  const url = gatewayUrl + '/api/gatt/nodes?mac=&access_token=&event=1';

  const sse = new EventSource(url);
  
  sse.onerror = function(error) {
    console.log('open notify sse failed:', error);
  };
  
  sse.onmessage = function(message) {
    console.log('recevied notify sse message:', message);
  };
});

router.get('/openNotification', function(req, res, next) {

  const url = gatewayUrl + '/api/management/nodes/connection-state?mac=&access_token=';

  const sse = new EventSource(url);
  
  sse.onerror = function(error) {
    console.log('open connect status sse failed:', error);
  };
  
  sse.onmessage = function(message) {
    console.log('recevied connect status sse message:', message);
  };
});

router.get('/pair/:macAddress/:ioCapability', function(req, res, next) {
  const macAddress = req.params.macAddress
  const ioCapability = req.params.ioCapability

  var options = {
    'method': 'POST',
    'url':  gatewayUrl + '/api/management/nodes/'+macAddress+'/pair/?mac=&access_token=',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"iocapability":ioCapability})
  };
  request(options, function (error, response) { 
    if (error) console.error(error);
    else {
      console.log(response.body)
      res.send(response.body)
    }
  });
});

router.get('/pairInput/:macAddress/:passkey', function(req, res, next) {
  const macAddress = req.params.macAddress
  const passkey = req.params.passkey

  var options = {
    'method': 'POST',
    'url': gatewayUrl + '/api/management/nodes/'+macAddress+'/pair-input/?mac=&access_token=',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"passkey":passkey})
  };
  request(options, function (error, response) { 
    if (error) console.error(error);
    else {
      console.log(response.body)
      res.send(response.body)
    }
  });
});

router.get('/unpair/:macAddress', function(req, res, next) {
  const macAddress = req.params.macAddress

  var request = require('request');
  var options = {
    'method': 'DELETE',
    'url': 'http://192.168.1.8/api/management/nodes/C0:00:5B:D1:AA:BC/bond/?mac=&access_token=',
    'headers': {
    }
  };
  request(options, function (error, response) { 
    if (error) console.error(error);
    else {
      console.log(response.body)
      res.send(response.body)
    }
  });
});



module.exports = router;
