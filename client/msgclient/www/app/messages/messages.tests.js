describe('The messages service', function () {
    beforeEach(module('starter.messages'));
    describe('when getting the inbox', function () {
        var inbox;

        beforeEach(inject(function ($httpBackend, messages) {
            $httpBackend.expectGET('api:3000/api/messages/inbox').respond([{subject: 'one'}, {subject: 'two'}]);
            messages.getInbox((err, data) => inbox = data);
            $httpBackend.flush();
        }));

        it('returns the messages in the inbox', function () {
            expect(inbox.map(m => m.subject)).toEqual(['one', 'two']);
        });
    });
});
