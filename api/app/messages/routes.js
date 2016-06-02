var router = require('express').Router();
var requireToken = require('../auth/requireToken');
var Message = require('./Message');

// Ensure we'll always be authenticated in this part of the api
router.use(requireToken);

// Limit the fields that we return to clients (we don't want to expose everything)
var apiFields = 'subject body';

router.get('/:id', function getMessage(req, res) {
    Message.findOne({_id: req.params.id, owner: req.userid}, apiFields, function (err, msg) {
        res.json(msg);
    });
});

router.get('/inbox', function getInbox() {
    res.json([]);
});

router.get('/outbox', function getOutbox() {
    res.json([]);
});

router.post('/outbox', function sendMessage() {
    res.status(201);
});

module.exports = router;
