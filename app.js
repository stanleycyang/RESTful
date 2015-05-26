// Load environmental variables
require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var colors = require('colors');

var routes = require('./routes/index');
var users = require('./routes/users');
var authenticate = require('./routes/authenticate');
var blogs = require('./routes/blogs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Connect MongoDB
mongoose.connect('mongodb://stan:foobar@ds035702.mongolab.com:35702/heroku_app37202379');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// For all requests
app.use(function(request, response, next){
  console.log('Someone came to our application'.blue);
  //var token = request.body.token || request.params('token') || request.headers['x-access-token'];

  console.log(process.env.JWT_SECRET);
  next();
});

// Home page
app.use('/', routes);

// API routes
app.use('/api/users', users);
app.use('/api', authenticate);
app.use('/api/blogs', blogs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
