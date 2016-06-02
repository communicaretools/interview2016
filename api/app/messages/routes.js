var router = require('express').Router();
var requireToken = require('../auth/requireToken');
var Message = require('./Message');

// Ensure we'll always be authenticated in this part of the api
router.use(requireToken);

// Limit the fields that we return to clients (we don't want to expose everything)
var apiFields = 'subject body';

router.get('/inbox', function getInbox(req, res) {
    Message.find({owner: req.userid, location: 'inbox'}, apiFields, function (err, msgs) {
        if (err) {
            res.status(500).json({error: err});
            return;
        }
        res.json(msgs);
    });
});

router.get('/outbox', function getOutbox() {
    res.json([]);
});

router.post('/outbox', function sendMessage() {
    res.status(201);
});

router.get('/:id', function getMessage(req, res) {
    Message.findOne({_id: req.params.id, owner: req.userid}, apiFields, function (err, msg) {
        if (err) {
            res.status(404).json(null);
            return;
        }
        res.json(msg);
    });
});

module.exports = router;
