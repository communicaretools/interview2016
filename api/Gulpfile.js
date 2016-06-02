var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  jasmine = require('gulp-jasmine');

gulp.task('start', function () {
    return nodemon({
        script: 'app/index.js'
    });
});

gulp.task('test', function () {
    return gulp.src('app/**/*.tests.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmine())
        .once('end', function () {
            process.exit(0);
        });
});

gulp.task('populate-db', function (done) {
    var db = require('./app/db');
    var User = require('./app/users/User');
    var Message = require('./app/messages/Message');

    var users = [
        new User({username: 'admin', name: 'Administrator'}),
        new User({username: 'anna', name: 'Anna Karenina'}),
        new User({username: 'don', name: 'Don Quixote'})
    ];
    users.forEach(u => u.setPassword('test'));

    User.create(users, function (err, saved) {
        var messages = [];
        saved.forEach(function (user, index) {
            messages.push({owner: user._id, from: saved[(index+1) % saved.length]._id, to: user._id, location: 'inbox', subject: 'One', body: 'Test message'}),
            messages.push({owner: user._id, from: saved[(index+2) % saved.length]._id, to: user._id, location: 'inbox', subject: 'Two', body: 'Test message'}),
            messages.push({owner: user._id, from: saved[(index+1) % saved.length]._id, to: user._id, location: 'inbox', subject: 'Three', body: 'Test message'})
        });
        Message.create(messages, done);
    });
});
