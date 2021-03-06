var jwt = require('jsonwebtoken');
var User = require('../models/user');

exports.login = function(request, response){
  User.findOne({
    username: request.body.username
  }).select('name username password')
  .exec(function(error, user){
    if(error){
      throw error;
    }

    // user doesn't exist
    if(!user){
      return response.json({
        success: false,
        message: 'Authentication failed.'
      });
    }

    // Check the password
    var validPassword = user.comparePassword(request.body.password);
    if(!validPassword){
      return response.json({
        success: false,
        message: 'Authentication failed.'
      });
    }

    // Create json web token
    var token = jwt.sign({
      name: user.name,
      username: user.username
    }, process.env.JWT_SECRET, {
      expiresInMinutes: 60*5
    });

    // Successful. Send back the jwt
    response.json({
      success: true,
      message: 'Token granted',
      token: token
    });

  });
};
