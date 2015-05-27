var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Blog', BlogSchema);
