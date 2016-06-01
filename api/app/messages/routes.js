var router = require('express').Router();
var Message = require('./models').Message;

// Limit the fields that we return to clients (we don't want to expose everything)
var apiFields = 'subject body';

router.get('/:id', function getMessage(req, res) {
    Message.findOne({_id: req.params.id}, apiFields, function (err, msg) {
        res.json(msg);
    });
});

module.exports = router;
