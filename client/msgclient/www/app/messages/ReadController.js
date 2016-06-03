angular.module('starter.messages')
    .controller('ReadController', [
        'messages',
        function (messages) {
            this.message = {
                from: {name: 'Anna'},
                subject: 'You have won $2.56!',
                body: 'Please send me a copy of your text editor config to claim your prize.'
            };
        }
    ]);
