// Go into testing mode as soon as this file is loaded, before loading app
process.env.NODE_ENV = 'test';
var app = require('./api');
var request = require('supertest');
// Enables tests to be simplified, as we now can do app.get(...)
// instead of requiring the app and supertest separately and then doing
// request(app).get(...)
module.exports = request(app);
// Using app.end(done) as parameter for env solves an incompatibility
// netween jasmine and supertest
module.exports.end = function (done) {
    return function adaptSupertestToJasmine(err, res) {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
    };
};
