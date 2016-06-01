var app = require('../test-app.js');
var Message = require('./models').Message;

describe('The messages router', function () {
    beforeEach(function clearMessages(done) {
        Message.remove(done);
    });
    describe('when GET-ing a particular message', function () {
        var messageId;
        beforeEach(function (done) {
            var msg = new Message({subject: 'test', body: 'test message'});
            msg.save(function (err, saved) {
                messageId = saved._id;
                done();
            });
        });
        it('should return a representation of the message as JSON', function (done) {
            app.get('/api/messages/' + messageId)
                .expect(200, {_id: messageId.toString(), subject: 'test', body: 'test message'})
                .end(app.end(done));
        });
    });
});
