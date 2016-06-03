angular.module('starter.messages')
    .controller('InboxController', [
        'messages',
        '$log',
        function (messages, $log) {
            $log.debug('Starting InboxController');
            this.messages = [
                {from: {name: 'Fred'}, subject: 'Hi, there!'},
                {from: {name: 'Anna'}, subject: 'You have won $2.56!'}
            ];
        }
    ]);
