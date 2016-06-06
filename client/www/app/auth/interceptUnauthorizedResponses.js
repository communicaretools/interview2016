angular.module('starter.auth')
    .factory('interceptUnauthorizedResponses', [
        '$rootScope',
        '$q',
        'pendingRequests',
        '$log',
        function ($rootScope, $q, pendingRequests, $log) {
            return {
                'responseError': function(rejection) {
                    $log.debug('Intercepted a failed request');
                    if (rejection.status == 401) {
                        $log.debug('Requesting login because of 401 response to request');
                        var deferred = $q.defer();
                        pendingRequests.queue(rejection, deferred);
                        $rootScope.$broadcast('auth.requestLogin');
                        return deferred.promise;
                    }
                    return $q.reject(rejection);
                }
            };
        }
    ])
    .service("pendingRequests", [
        '$rootScope',
        '$injector',
        '$log',
        function ($rootScope, $injector, $log) {
            var requestQueue = [];
            this.queue = function (response, deferred) {
                requestQueue.push({
                    config: response.config,
                    deferred: deferred
                });
            };
            var retryAll = function (authHeader) {
                var $http = $injector.get('$http');
                var retry = function (req) {
                    $log.debug('Retrying request', req.config, 'with authorization', authHeader);
                    req.config.headers = angular.extend({}, req.config.headers || {}, authHeader);
                    $http(req.config).then(function (response) {
                        req.deferred.resolve(response);
                    });
                };

                while (requestQueue.length > 0) {
                    var item = requestQueue.pop();
                    retry(item);
                }
            };

            $rootScope.$on('auth.loginSucceeded', function (event, token) {
                $log.debug('Login succeeded, retrying failed requests');
                retryAll({ 'Authorization': 'Bearer ' + token });
            });
    }])
    .config([
        '$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push('interceptUnauthorizedResponses');
        }
    ]);
