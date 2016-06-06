var express = require('express');
var bodyParser  = require('body-parser');
var db = require('./db');

var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello, World!');
});
app.use('/api/auth', require('./auth/routes.js'));
app.use('/api/messages', require('./messages/routes.js'));
app.use('/api/users', require('./users/routes.js'));

// Error handler
app.use(function logErrors(err, req, res, next) {
  console.error('An error occurred', err);
  console.error(err.stack);
  next(err);
});

module.exports = app;
