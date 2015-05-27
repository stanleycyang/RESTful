var express = require('express'),
    router = express.Router(),
    BlogsController = require('../controllers/blogscontroller'),
    TokenHelper = require('../helpers/tokenhelper');

// Protect API endpoints
router.use(function(request, response, next){
  TokenHelper.validateToken(request, response, next);
});

router.get('/', function(request, response, next){
  BlogsController.index(request, response);
});

router.post('/', function(request, response, next){
  BlogsController.create(request, response);
});

router.get('/:blog_id', function(request, response, next){
  BlogsController.show(request, response);
});

router.put('/:blog_id', function(request, response, next){
  BlogsController.update(request, response);
});

router.delete('/:blog_id', function(request, response, next){
  BlogsController.destroy(request, response);
});

module.exports = router;
