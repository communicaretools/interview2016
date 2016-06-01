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
        .pipe(jasmine());
});
