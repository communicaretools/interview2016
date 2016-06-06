describe('The login GUI (LoginController and friends)', function () {
    var showModal;
    beforeEach(module('starter.auth', function ($provide) {
        showModal = jasmine.createSpy('modal.show');
        var modalStub = {
            show: showModal,
            hide: angular.noop
        };
        $provide.service('$ionicModal', function () {
            return {
                fromTemplateUrl: function () {return {then: function (cb) {cb(modalStub)}};}
            };
        });
    }));
    describe('when a login is requested', function () {
        beforeEach(inject(function ($rootScope, $q, $ionicModal) {
            var loadModal = $q.defer();
            var modalSpy = spyOn($ionicModal, 'fromTemplateUrl').and.callThrough().and.returnValue(loadModal.promise);

            // Ensure that the loginModal service is loaded *after* setting
            // up the mock $ionicMock, so that we don't need to mock the html
            // loaded for the login form
            inject(function (loginModal) {
                loadModal.resolve({
                    show: showModal
                });
                $rootScope.$apply();
                $rootScope.$broadcast('auth.requestLogin');
                $rootScope.$apply();
            });
        }));

        it('opens the login modal', function () {
            expect(showModal).toHaveBeenCalled();
        });
    });

    describe('when submitting valid login details', function () {
        var registeredToken;
        beforeEach(inject(function ($httpBackend, $controller, $rootScope) {
            $httpBackend.expectPOST('/api/auth/token', {username: 'test', password: 'pwd'}).respond({token: 'the-token'});
            $rootScope.$on('auth.loginSucceeded', (event, token) => registeredToken = token);
            var ctl = $controller('LoginController', {loginModal: {close: angular.noop}});
            ctl.doLogin({ username: 'test', password: 'pwd' });
            $httpBackend.flush();
        }));

        it('posts the credentials to the api', inject(function ($httpBackend) {
            $httpBackend.verifyNoOutstandingExpectation();
        }));

        it('emits an event with the token', function () {
            expect(registeredToken).toEqual('the-token');
        });
    });

    describe('when submitting invalid login details', function () {
        var ctl;
        beforeEach(inject(function ($httpBackend, $controller, $rootScope) {
            $httpBackend.expectPOST('/api/auth/token', {username: 'test', password: 'pwd'}).respond(403, {});
            $rootScope.$on('auth.loginSucceeded', (event, token) => fail('should not succeed with invalid credentials'));
            ctl = $controller('LoginController', {loginModal: {close: angular.noop}});
            ctl.doLogin({ username: 'test', password: 'pwd' });
            $httpBackend.flush();
        }));

        it('posts the credentials to the api', inject(function ($httpBackend) {
            $httpBackend.verifyNoOutstandingExpectation();
        }));

        it('sets an error message for the view', function () {
            expect(ctl.invalidCredentials).toEqual(true);
        });
    });
});
