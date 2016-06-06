describe('The ReadController', function () {
    beforeEach(module('starter.messages'));
    describe('on intialization', function () {
        it('fetches the message specified by the route parameter', inject(function ($controller) {
            var msg = {
                getMessage: (id, cb) => cb(null, {_id: id, subject: 'test', body: 'test'})
            };
            var ctl = $controller('ReadController', {messages: msg, $stateParams: {id: 'msg-id'}});
            expect(ctl.message).toEqual({_id: 'msg-id', subject: 'test', body: 'test'});
        }));
    });
});
