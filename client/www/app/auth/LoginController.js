angular.module('starter.auth')
    .service('loginModal', [
        '$ionicModal',
        '$rootScope',
        '$log',
        function ($ionicModal, $rootScope, $log) {
            var modal;
            $ionicModal
                .fromTemplateUrl('app/auth/login.html', {})
                .then(function(instance) {
                    modal = instance;
                });

            return {
                open: x => modal.show(),
                close: x => modal.hide()
            };
        }])
    .run([
        '$rootScope',
        '$log',
        'loginModal',
        function ($rootScope, $log, loginModal) {
            $rootScope.$on('auth.requestLogin', function () {
                $log.debug('Login requested, showing login form');
                loginModal.open();
            });
        }
    ])
    .controller('LoginController', [
        '$rootScope',
        '$http',
        'loginModal',
        '$log',
        function ($rootScope, $http, loginModal, $log) {
            var login = this;
            this.doLogin = function (credentials) {
                $log.debug('Proceeding to log in with credentials', credentials);
                login.invalidCredentials = false;
                $http.post('/api/auth/token', credentials)
                     .success(function (data) {
                         $log.debug('Login successful, broadcasting event with token', data.token);
                         $rootScope.$broadcast('auth.loginSucceeded', data.token);
                         loginModal.close();
                     })
                     .error(function (err) {
                         login.invalidCredentials = true;
                     });
            };
        }
    ]);
