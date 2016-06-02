var tokens = require('./tokens');

describe('The tokens service', function () {
    describe('when creating a token', function () {
        var token;
        beforeEach(function () {
            token = tokens.create({userid: 42});
        });
        it('is seen as valid', function (done) {
            tokens.validate(token, function (err, value) {
                expect(err).toBeFalsy();
                done();
            });
        });
        it('contains the information passed to the service', function (done) {
            tokens.validate(token, function (err, value) {
                expect(value.userid).toEqual(42);
                done();
            });
        });
        it('is not valid if tampered with', function (done) {
            token += "abc";
            tokens.validate(token, function (err, value) {
                expect(err).toBeTruthy();
                done();
            });
        });
    });
});
