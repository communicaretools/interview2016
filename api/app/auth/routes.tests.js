var app = require('../test-app');
var User = require('../users/User');

describe('/api/auth routes', function () {
    beforeEach(function (done) {
        User.remove()
          .then(function populateUsers() {
              var valid = new User({username: 'test'});
              valid.setPassword('pazzw0rd1337');
              valid.save().then(done);
          });
    });

    describe('when posting a valid username/password combination to /api/auth/token', function () {
        it('should return a token', function (done) {
            app.post('/api/auth/token')
              .send({username: 'test', password: 'pazzw0rd1337'})
              .expect(200)
              .expect(function (res) {
                  expect(res.body.token).toBeDefined();
              })
              .end(app.end(done));
        });
    });

    describe('when posting an incorrect password to /api/auth/token', function () {
        it('should return a token', function (done) {
            app.post('/api/auth/token')
              .send({username: 'test', password: 'wrong'})
              .expect(403)
              .end(app.end(done));
        });
    });

    describe('when posting an invalid username to /api/auth/token', function () {
        it('should return a token', function (done) {
            app.post('/api/auth/token')
              .send({username: 'foobar', password: 'pazzw0rd1337'})
              .expect(403)
              .end(app.end(done));
        });
    });
});
