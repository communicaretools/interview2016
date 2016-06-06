describe('The login GUI (LoginController and friends)', function () {
    beforeEach(module('starter.auth'));
    describe('when a login is requested', function () {
        var showModal;
        beforeEach(inject(function ($rootScope, $q, $ionicModal) {
            var loadModal = $q.defer();
            showModal = jasmine.createSpy('modal.show');
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

    describe('when submitting login details', function () {
        var registeredToken;
        beforeEach(inject(function ($httpBackend, $controller, $rootScope) {
            $httpBackend.expectPOST('api:3000/api/auth/token', {username: 'test', password: 'pwd'}).respond({token: 'the-token'});
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
});
