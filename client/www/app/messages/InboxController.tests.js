describe('The InboxController', function () {
    beforeEach(module('starter.messages'));
    describe('on intialization', function () {
        it('fetches the messages in the inbox', inject(function ($controller) {
            var msg = {
                getInbox: cb => cb(null, [{subject: 'one', subject: 'two'}])
            };
            var ctl = $controller('InboxController', {messages: msg});
            expect(ctl.messages).toEqual([{subject: 'one', subject: 'two'}]);
        }));
    });
});
