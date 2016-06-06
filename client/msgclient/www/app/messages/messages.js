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

            function getInbox(callback) {
                $http.get('api:3000/api/messages/inbox')
                    .success(data => callback(null, data))
                    .error(err => callback(err, null));
            }

            function getOutbox(callback) {

            }

            function send(message, callback) {

            }

            return {
                getInbox: getInbox,
                getOutbox: getOutbox,
                send: send
            };
        }
    ]);
