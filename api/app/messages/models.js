var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
    subject: String,
    body: String
});

module.exports = {
    Message: Message
};
