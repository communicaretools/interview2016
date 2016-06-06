describe('The outgoing requests decorator (addAuthTokenToOutgoingRequests)', function () {
    beforeEach(module('starter.auth'));

    describe('when no token has been set', function () {
        it('should not decorate the requests', inject(function (addAuthTokenToOutgoingRequests) {
            var config = {url: 'http://test.com/example', headers: {}};
            var result = addAuthTokenToOutgoingRequests.request(config);
            expect(result.headers.Authorization).toBe(undefined);
        }));
    });

    describe('when an auth token has been set', function () {
        it('should decorate the requests with an Authorization header with the Bearer token', inject(function (addAuthTokenToOutgoingRequests, $rootScope) {
            $rootScope.$emit('auth.loginSucceeded', 'the-token');
            $rootScope.$apply();

            var config = {url: 'http://test.com/example', headers: {}};
            var result = addAuthTokenToOutgoingRequests.request(config);
            expect(result.headers.Authorization).toBe('Bearer the-token');
        }));
    });
});
