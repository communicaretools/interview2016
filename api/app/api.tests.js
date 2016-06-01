var app = require('./test-app');

describe('The root of the api', function () {
    describe('when GET-ing the api root', function () {
        it('should return OK with "Hello, World!""', function (done) {
            app.get('/')
               .expect(200, 'Hello, World!')
               .end(app.end(done));
        });
    });
});
