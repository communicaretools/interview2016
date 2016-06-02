var mongoose = require('mongoose');
var dbName = 'msg_api_' + process.env.NODE_ENV || 'development';
mongoose.connect('mongodb://mongo/' + dbName, {auto_reconnect: true});

function gracefulExit() {
    mongoose.disconnect(function () {
        process.exit(0);
    });
}
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
