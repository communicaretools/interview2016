var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello, World!');
});
app.use('/api/messages', require('./messages/routes.js'));

module.exports = app;
