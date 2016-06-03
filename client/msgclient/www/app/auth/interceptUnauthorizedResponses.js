angular.module('starter.auth')
    .factory('interceptUnauthorizedResponses', [
        function () {
            return {};
        }
    ])
    .config([
        '$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push('interceptUnauthorizedResponses');
        }
    ]);
