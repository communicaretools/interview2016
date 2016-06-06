angular.module('starter.auth')
    .factory('interceptUnauthorizedResponses', [
        '$rootScope',
        '$q',
        'pendingRequests',
        function ($rootScope, $q, pendingRequests) {
            return {
                'responseError': function(rejection) {
                    if (rejection.status == 403) {
                        var deferred = $q.defer();
                        pendingRequests.queue(rejection, deferred);
                        $rootScope.$emit('auth.requestLogin');
                        return deferred.promise;
                    }
                    return $q.reject(rejection);
                }
            };
        }
    ])
    .service("pendingRequests", ['$rootScope', '$injector', function ($rootScope, $injector) {
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
                req.config.headers = angular.extend({}, req.config.headers || {}, authHeader);
                $http(req.config).then(function (response) {
                    $rootScope.$broadcast('auth.loginSucceeded');
                    req.deferred.resolve(response);
                });
            };

            while (requestQueue.length > 0) {
                var item = requestQueue.pop();
                retry(item);
            }
        };

        $rootScope.$on('auth.loginSucceeded', function (event, token) {
            retryAll({ 'Authorization': 'Bearer ' + token });
        });
    }])
    .config([
        '$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push('interceptUnauthorizedResponses');
        }
    ]);
