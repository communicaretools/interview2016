var db = require('../db');
var models = require('./models');
var Message = models.Message;

describe('The Message model', function () {
    beforeEach(function clearMessages(done) {
        Message.remove(done);
    });
    describe('when creating and saving a valid Message', function () {
        beforeEach(function setup(done) {
            var msg = new Message({subject: 'test', body: 'test message'});
            msg.save(done);
        });

        it('can be saved to the database', function (done) {
            Message.find({subject: 'test'}, function (err, msgs) {
                expect(msgs.length).toEqual(1);
                expect(msgs[0].subject).toEqual('test');
                expect(msgs[0].body).toEqual('test message');
                done();
            });
        });
    });
});
