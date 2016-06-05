var db = require('../db');
var app = require('../test-app.js');
var Message = require('./Message');
var User = require('../users/User');

describe('The messages router', function () {
    beforeEach(function clearMessages(done) {
        Message.remove().then(x => User.remove(done));

    });
    describe('when GET-ing a particular message', function () {
        var messageId;
        beforeEach(function (done) {
            var msg = new Message({owner: app.defaultUser, isRead: false, from: app.defaultUser, to: [app.defaultUser], subject: 'test', body: 'test message'});
            msg.save(function (err, saved) {
                messageId = saved._id;
            }).then(function () {
                var user = new User({_id: app.defaultUser, username: 'test', name: 'Test Testersen'});
                user.save(done);
            });
        });
        it('should return a representation of the message as JSON', function (done) {
            app.get('/api/messages/' + messageId)
                .authenticate()
                .expect(200, {
                    _id: messageId.toString(),
                    from: {_id: app.defaultUser, username: 'test', name: 'Test Testersen'},
                    to: [{_id: app.defaultUser, username: 'test', name: 'Test Testersen'}],
                    subject: 'test',
                    body: 'test message',
                    isRead: true
                })
                .end(app.end(done));
        });
    });
    describe('when GET-ing the inbox for the logged-in user', function () {
        beforeEach(function (done) {
            var msgs = [
                {owner: app.defaultUser, location: 'inbox', from: app.defaultUser, to: [app.defaultUser], subject: 'one', body: 'test message'},
                {owner: app.defaultUser, location: 'inbox', from: app.defaultUser, to: [app.defaultUser], subject: 'two', body: 'test message'},
                {owner: app.defaultUser, location: 'outbox', from: app.defaultUser, to: [app.defaultUser], subject: 'three', body: 'in outbox'},
                {owner: '57508758ca54310d7aaf2af4', location: 'inbox', from: app.defaultUser, to: ['57508758ca54310d7aaf2af4'], subject: 'test', body: 'someone elses message'}
            ];
            Message.create(msgs)
                .then(function () {
                    var user = new User({_id: app.defaultUser, username: 'test', name: 'Test Testersen'});
                    user.save(done);
                });
        });

        it('should contain the messages in the inbox', function (done) {
            app.get('/api/messages/inbox')
               .authenticate()
               .expect(function (res) {
                   expect(res.status).toEqual(200);
                   expect(res.body.map(x => x.subject)).toEqual(['one', 'two']);
                   expect(res.body.map(x => x.from.username)).toEqual(['test', 'test']);
               })
               .end(app.end(done));
        });
    });
});
