var app = require('./api');
var port = process.env.PORT || 3000;

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
