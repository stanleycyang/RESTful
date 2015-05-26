var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    // We will not show the password when listing our users
    select: false
  }
});

// Hash the password before we save the user
UserSchema.pre('save', function(next){
  var user = this;

  // Only hash the password if the password has been changed or user is new
  if(!user.isModified('password')){
    return next();
  }

  bcrypt.hash(user.password, null, null, function(error, hash){
    if(error){
      return next(error);
    }

    user.password = hash;
    next();
  });
});

// Method to compare with database hash
UserSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

// Return the model
module.exports = mongoose.model('User', UserSchema);
