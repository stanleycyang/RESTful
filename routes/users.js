var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/userscontroller');

/* GET users listing. */
router.get('/', function(request, response, next) {
  UsersController.index(request, response);
});

router.post('/', function(request, response, next){
  UsersController.create(request, response);
});

router.get('/:user_id', function(request, response, next){
  UsersController.show(request, response);
});

router.put('/:user_id', function(request, response, next){
  UsersController.update(request, response);
});

router.delete('/:user_id', function(request, response, next){
  UsersController.destroy(request, response);
});

module.exports = router;
