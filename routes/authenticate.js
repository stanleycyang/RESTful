var express = require('express');
var router = express.Router();
var SessionsController = require('../controllers/sessionscontroller.js');

// 1. Make sure the user with the username exists
// 2. Check if user provided the correct password
// 3. Create a token if all is well
router.post('/authenticate', function(request, response, next){
  SessionsController.login(request, response);
});

module.exports = router;
