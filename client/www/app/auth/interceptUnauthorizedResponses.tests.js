describe('The unauthorized response interceptor', function () {
    beforeEach(module('starter.auth', function ($provide) {
        var modalStub = {
            show: angular.noop,
            hide: angular.noop
        };
        $provide.service('$ionicModal', function () {
            return {
                fromTemplateUrl: function () {return {then: function (cb) {cb(modalStub)}};}
            };
        });
    }));
    describe('when detecting a 401 response', function () {
        var loginRequested, requestSucceeded;

        beforeEach(inject(function ($rootScope, $httpBackend, $http) {
            $httpBackend.expectGET('/secured/endpoint').respond(401);
            loginRequested = requestSucceeded = false;
            $rootScope.$on('auth.requestLogin', x => loginRequested = true);
            $http.get('/secured/endpoint').success(x => requestSucceeded = true);
            $httpBackend.flush();
        }));

        it('should emit an event to ask for credentials', function () {
            expect(loginRequested).toEqual(true);
        });

        it('should retry the request and call the original handler if the auth.loginSucceeded event is emitted', inject(function ($rootScope, $httpBackend) {
            $httpBackend.expectGET('/secured/endpoint').respond(200);
            $rootScope.$emit('auth.loginSucceeded', 'the-token');
            $httpBackend.flush();
            expect(requestSucceeded).toEqual(true);
        }));
    });
});
