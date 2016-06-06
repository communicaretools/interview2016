angular.module('starter.messages')
    .controller('ComposeController', [
        'messages',
        '$log',
        function (messages, $log) {
            $log.debug('Starting InboxController');
            
        }
    ]);
