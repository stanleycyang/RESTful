// Bring in our model
var User = require('../models/user');

exports.index = function(request, response){
  User.find(function(error, users){
    if(error){
      response.json({message: 'User record failed to be retrieved'});
    }
    // Send back all the users
    response.json(users);
  });

};

exports.create = function(request, response){
  var user = new User({
    name: request.body.name,
    username: request.body.username,
    password: request.body.password
  });

  user.save(function(error){
    if(error){
      return response.json({success: false, message: 'User cannot be created'});
    }

    // User has been created
    response.json({message: 'User created'});
  });

};

exports.show = function(request, response){
  User.findById(request.params.user_id, function(error, user){
    if(error){
      response.send(error);
    }
    // Send back the user
    response.json(user);
  });
};

exports.update = function(request, response){
  User.findById(request.params.user_id, function(error, user){
    if(error) response.json({message: 'Failed to update the user'});

    if(request.body.name) user.name = request.body.name;
    if(request.body.username) user.username = request.body.username;
    if(request.body.password) user.password = request.body.password;

    user.save(function(error){
      if(error){
        response.json({message: 'Failed to update the user'});
      }
      response.json({message: 'User updated'});
    });

  });
};

exports.destroy = function(request, response){
  User.remove({
    _id: request.params.user_id
  }, function(error, user){
    if(error){
      response.json({message: error});
    }

    response.json({message: 'Successfully deleted'});
  });
};
