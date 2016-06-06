angular.module('starter.auth')
    .service('loginModal', [
        '$ionicModal',
        '$rootScope',
        function ($ionicModal, $rootScope) {
            var modal;
            $ionicModal
                .fromTemplateUrl('app/auth/login.html', {})
                .then(function(instance) {
                    modal = instance;
                });
            $rootScope.$on('auth.requestLogin', function () {
                modal.show();
            });

            return {
                open: x => modal.show(),
                close: x => modal.hide()
            };
        }])
    .controller('LoginController', [
        '$rootScope',
        '$http',
        'loginModal',
        function ($rootScope, $http, loginModal) {
            this.doLogin = function (credentials) {
                $http.post('/api/auth/token', credentials)
                     .success(function (data) {
                         $rootScope.$broadcast('auth.loginSucceeded', data.token);
                         loginModal.close();
                     });
            };
        }
    ]);
