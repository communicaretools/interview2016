var request = require('supertest');
var app = require('../app/api.js');

describe('The root of the api', function () {
    describe('when GET-ing the api root', function () {
        it('should return OK with "Hello, World!""', function (done) {
            request(app)
                .get('/')
                .expect(200, 'Hello, World!')
                .end(function (err, res) {
                    if (err) {
                      done.fail(err);
                    } else {
                      done();
                    }
                });
        });
    });
});
