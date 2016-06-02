var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
    owner: mongoose.Schema.Types.ObjectId,
    location: [String],  // 'inbox' or 'outbox'
    isRead: Boolean,

    from: mongoose.Schema.Types.ObjectId,
    to: [mongoose.Schema.Types.ObjectId],
    subject: String,
    body: String
});

module.exports = Message;
