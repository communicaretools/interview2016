var jwt = require('jsonwebtoken');
var secret = 'd93K..,-8{t#91pOOiqBz<`*3m';  // in a real app: from environment/config

function create(data) {
    return jwt.sign(data, secret, {
        expiresIn: "7 days"
    });
}

function validate(token, callback) {
    jwt.verify(token, secret, callback);
}

module.exports = {
    create: create,
    validate: validate
};
