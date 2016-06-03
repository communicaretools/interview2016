var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
    owner: mongoose.Schema.Types.ObjectId,
    location: String,  // 'inbox' or 'outbox'
    isRead: Boolean,

    from: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    to: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    subject: String,
    body: String
});

module.exports = Message;
