var tokens = require('./tokens');

// Ensures that the user is authenticated, and sets the userid
// property on req for use in downstream handlers
function requireToken(req, res, next) {
    var header = req.get('Authorization');
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(403).json({login: '/api/auth/session'});
    }

    var token = header.substring('Bearer '.length);
    tokens.validate(token, function handleToken(err, loginInfo) {
        if (err) {
            res.status(403).json({login: '/api/auth/session'});
            return;
        }
        req.userid = loginInfo.userid;
        next();
    });
}

module.exports = requireToken;
