angular.module('starter.messages')
    .controller('ReadController', [
        'messages',
        '$stateParams',
        function (messages, $stateParams) {
            var read = this;
            messages.getMessage($stateParams.id, function (err, msg) {
                read.message = msg;
            });
        }
    ]);
