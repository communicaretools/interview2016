describe('The messages service', function () {
    beforeEach(module('starter.messages'));
    describe('when getting the inbox', function () {
        var inbox;

        beforeEach(inject(function ($httpBackend, messages) {
            $httpBackend.expectGET('/api/messages/inbox').respond([{subject: 'one'}, {subject: 'two'}]);
            messages.getInbox((err, data) => inbox = data);
            $httpBackend.flush();
        }));

        it('returns the messages in the inbox', function () {
            expect(inbox.map(m => m.subject)).toEqual(['one', 'two']);
        });
    });

    describe('when getting a single message', function () {
        var msg;

        beforeEach(inject(function ($httpBackend, messages) {
            $httpBackend.expectGET('/api/messages/57556e1b8e75501e00916225').respond({subject: 'sub', body: 'test'});
            messages.getMessage('57556e1b8e75501e00916225', (err, data) => msg = data);
            $httpBackend.flush();
        }));

        it('returns the messages in the inbox', function () {
            expect(msg).toEqual({subject: 'sub', body: 'test'});
        });
    });
});
