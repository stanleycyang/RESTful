var jwt = require('jsonwebtoken');

// Validate my token
exports.validateToken = function(request, response, next){
  // Get the token
  var token = request.body.token || request.query.token || request.headers['x-access-token'];

  console.log(token);
  console.log(process.env.JWT_SECRET);

  if(token){
    jwt.verify(token, process.env.JWT_SECRET, function(error, decoded){
      if(error){
        return response.status(403).send({
          success: false,
          message: error.message
        });
      }else{
        request.decoded = decoded;
        next();
      }
    });

  }else{
    return response.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }

};
