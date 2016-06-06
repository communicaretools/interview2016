angular.module('starter.auth')
    .factory('addAuthTokenToOutgoingRequests', [
        '$rootScope',
        '$log',
        function ($rootScope, $log) {
            var token;
            $rootScope.$on('auth.loginSucceeded', function (event, authToken) {
                $log.debug('Registering token for addition to outgoing requests', authToken);
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
