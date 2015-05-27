var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/userscontroller');
// Bring in the tokenhelper
var TokenHelper = require('../helpers/tokenhelper.js');

// Create a new user
router.post('/', function(request, response, next){
  UsersController.create(request, response);
});

// Lock down rest of the endpoints with TokenHelper
router.use(function(request, response, next){
  TokenHelper.validateToken(request, response, next);
});

/* GET users listing. */
router.get('/', function(request, response, next) {
  UsersController.index(request, response);
});

//Get single user listing
router.get('/:user_id', function(request, response, next){
  UsersController.show(request, response);
});

// Update user
router.put('/:user_id', function(request, response, next){
  UsersController.update(request, response);
});

// Delete user
router.delete('/:user_id', function(request, response, next){
  UsersController.destroy(request, response);
});

module.exports = router;
