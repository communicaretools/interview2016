var express = require('express');
var mongoose = require('mongoose');

var dbName = 'msg_api_' + process.env.NODE_ENV || 'development';
console.log('Connecting to db', dbName);
mongoose.connect('mongodb://mongo/');

var app = express();
// Error handler
app.use(function logErrors(err, req, res, next) {
  console.error('An error occurred', err);
  console.error(err.stack);
  next(err);
});

app.get('/', function (req, res) {
  res.send('Hello, World!');
});
app.use('/api/messages', require('./messages/routes.js'));

module.exports = app;
