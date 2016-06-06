angular.module('starter.auth')
    .factory('addAuthTokenToOutgoingRequests', [
        '$rootScope',
        function ($rootScope) {
            var token;
            $rootScope.$on('auth.loginSucceeded', function (event, authToken) {
                token = authToken;
            });

            return {
                'request': function (config) {
                    if (token) {
                        if (!config.headers) { config.headers = {}; }
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    return config;
                }
            };
        }
    ])
    .config([
        '$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push('addAuthTokenToOutgoingRequests');
        }
    ]);
