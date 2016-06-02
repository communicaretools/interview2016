var db = require('../db');
var User = require('./User');

describe('The User model', function () {
    beforeEach(function clearAllUsers(done) {
        User.remove(done);
    });
    describe('when creating and saving a User', function () {
        beforeEach(function (done) {
            var user = new User({username: 'test', name: 'Test Testersen'});
            user.save(done);
        });

        it('can be retrieved from the database', function (done) {
            User.findOne({username: 'test'}, function (err, retrieved) {
                expect(retrieved.name).toEqual('Test Testersen');
                done();
            });
        });
    });
    describe('-> the password methods', function () {
        var user;
        beforeEach(function () {
            user = new User({username: 'test', name: 'Testersen'});
        });
        it('disallows attempts when the saved password is not set', function () {
            // no password set
            expect(user.isPasswordValid('')).toBe(false);
        });
        it('recognizes the correct password', function () {
            user.setPassword('p4ssW0rD');
            expect(user.isPasswordValid('p4ssW0rD')).toBe(true);
        });
        it('disallows an incorrect password', function () {
            user.setPassword('p4ssW0rD');
            expect(user.isPasswordValid('butterfly')).toBe(false);
        });
        it('disallows attempts with null password', function () {
            user.setPassword('p4ssW0rD');
            expect(user.isPasswordValid(null)).toBe(false);
        });
    });
});
