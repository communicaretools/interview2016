var express = require('express');
var db = require('./db');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello, World!');
});
app.use('/api/messages', require('./messages/routes.js'));

// Error handler
app.use(function logErrors(err, req, res, next) {
  console.error('An error occurred', err);
  console.error(err.stack);
  next(err);
});

module.exports = app;
