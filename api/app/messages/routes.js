var router = require('express').Router();

router.get('/:id', function getMessage(req, res) {
    var msg = {_id: req.params.id, subject: 'hard-coded'};
    return res.status(200).json(msg).send();
});

module.exports = router;
