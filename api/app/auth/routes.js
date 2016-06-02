var router = require('express').Router();
var User = require('../users/User');
var tokens = require('./tokens');

router.post('/token', function (req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err || !user) {
            res.status(403).json({});
            return;
        }

        if (user.isPasswordValid(req.body.password)) {
            res.status(200).json({
                token: tokens.create({userid: user._id})
            });
        } else {
            res.status(403).json({});
        }
    });
});

module.exports = router;
