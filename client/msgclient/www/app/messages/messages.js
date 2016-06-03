angular.module('starter.messages')
    .service('messages', [
        '$http',
        function ($http) {
            var Message = function messageConstructor(data) {
                angular.copy(data, this);
            };
            Message.prototype.generateReply = function generateReply() {
                var reply = new Message(this);
                reply.to = this.from;
                return reply;
            };

            function getInbox() {

            }

            function getOutbox() {

            }

            function send(message) {

            }

            return {
                getInbox: getInbox,
                getOutbox: getOutbox,
                send: send
            };
        }
    ]);
