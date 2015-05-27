var express = require('express'),
    router = express.Router(),
    TokenHelper = require('../helpers/tokenhelper');

// Protect API endpoints
router.use(function(request, response, next){
  TokenHelper.validateToken(request, response, next);
});

router.get('/', function(request, response, next){
  response.json({message: 'Welcome to my API'});
});

module.exports = router;
