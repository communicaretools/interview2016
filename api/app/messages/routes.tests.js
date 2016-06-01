var app = require('../test-app.js');

describe('The messages router', function () {
    describe('when GET-ing a particular message', function () {
        it('should return a representation of the message as JSON', function (done) {
            app.get('/api/messages/42')
                .expect(200, {_id: 42, subject: 'hard-coded'})
                .end(app.end(done));
        });
    });
});
