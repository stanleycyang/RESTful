var express = require('express'),
    router = express.Router();

router.get('/', function(request, response, next){
  response.json({message: 'Welcome to my API'});
});

module.exports = router;
