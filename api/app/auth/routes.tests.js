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
    /*describe('when posting a valid username/password combination to /api/auth/session', function (done) {
        app.post('/api/session')
          .send({username: 'test', password: 'pazzw0rd1337'})
          .expect(200)
          .end(app.end(done));
    });*/
});
