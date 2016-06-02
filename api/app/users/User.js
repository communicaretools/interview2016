var mongoose = require('mongoose');
var CryptoJS = require("crypto-js");

var UserSchema = new mongoose.Schema({
    username: {type: String, index: true},
    name: String,
    password: {
        hash: String,
        salt: String
    }
});

UserSchema.methods.setPassword = function setPassword(pwd) {
    var salt = CryptoJS.lib.WordArray.random(128/8);
    this.password = {
        salt: salt.toString(),
        hash: CryptoJS.SHA256(pwd+salt).toString()
    };
};

UserSchema.methods.isPasswordValid = function isPasswordValid(attempted) {
    if (!this.password || !this.password.salt) { return false; }
    var hashed = CryptoJS.SHA256(attempted+this.password.salt).toString();
    return this.password.hash === hashed;
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
