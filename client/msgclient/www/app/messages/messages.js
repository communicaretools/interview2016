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
                $http.get('/api/messages/inbox')
                    .success(data => callback(null, data))
                    .error(err => callback(err, null));
            }

            function getOutbox(callback) {

            }

            function getMessage(id, callback) {
                $http.get('/api/messages/' + id)
                    .success(data => callback(null, data))
                    .error(err => callback(err, null));
            }

            function send(message, callback) {

            }

            return {
                getInbox: getInbox,
                getOutbox: getOutbox,
                getMessage: getMessage,
                send: send
            };
        }
    ]);
