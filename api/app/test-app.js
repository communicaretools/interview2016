// Go into testing mode as soon as this file is loaded, before loading app
process.env.NODE_ENV = 'test';
var app = require('./api');
var request = require('supertest');
var tokens = require('./auth/tokens');

// Enables tests to be simplified, as we now can do app.get(...)
// instead of requiring the app and supertest separately and then doing
// request(app).get(...)
var testApp = request(app);
// Using app.end(done) as parameter for env solves an incompatibility
// netween jasmine and supertest
testApp.end = function (done) {
    return function adaptSupertestToJasmine(err, res) {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
    };
};
// The userid that will be authenticated if none is given to authenticate()
testApp.defaultUser = '507f191e810c19729de860ea';
// Extend supertest with a method to add an authentication token to the current request (optional: specify userid)
request.Test.prototype.authenticate = function (userid) {
    this.set('Authorization', 'Bearer ' + tokens.create({userid: userid || '507f191e810c19729de860ea'}));
    return this;
};

module.exports = testApp;
