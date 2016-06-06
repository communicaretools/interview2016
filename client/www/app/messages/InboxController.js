angular.module('starter.messages')
    .controller('InboxController', [
        'messages',
        '$log',
        function (messages, $log) {
            $log.debug('Starting InboxController');
            var login = this;
            messages.getInbox(function processMessagesInInbox(err, msgs) {
                login.messages = msgs;
            });
        }
    ]);
