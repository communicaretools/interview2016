var db = require('../db');
var app = require('../test-app.js');
var Message = require('./Message');

describe('The messages router', function () {
    beforeEach(function clearMessages(done) {
        Message.remove(done);
    });
    describe('when GET-ing a particular message', function () {
        var messageId;
        beforeEach(function (done) {
            var msg = new Message({owner: app.defaultUser, subject: 'test', body: 'test message'});
            msg.save(function (err, saved) {
                messageId = saved._id;
                done();
            });
        });
        it('should return a representation of the message as JSON', function (done) {
            app.get('/api/messages/' + messageId)
                .authenticate()
                .expect(200, {_id: messageId.toString(), subject: 'test', body: 'test message'})
                .end(app.end(done));
        });
    });
    describe('when GET-ing the inbox for the logged-in user', function () {
        beforeEach(function (done) {
            var msgs = [
                {owner: app.defaultUser, location: 'inbox', subject: 'one', body: 'test message'},
                {owner: app.defaultUser, location: 'inbox', subject: 'two', body: 'test message'},
                {owner: app.defaultUser, location: 'outbox', subject: 'three', body: 'in outbox'},
                {owner: '57508758ca54310d7aaf2af4', location: 'inbox', subject: 'test', body: 'someone elses message'}
            ];
            Message.create(msgs, done);
        });

        it('should contain the messages in the inbox', function (done) {
            app.get('/api/messages/inbox')
               .authenticate()
               .expect(function (res) {
                   expect(res.status).toEqual(200);
                   expect(res.body.map(x => x.subject)).toEqual(['one', 'two']);
               })
               .end(app.end(done));
        });
    });
});
