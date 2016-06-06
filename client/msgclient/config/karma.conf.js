// Karma configuration
// Generated on Tue Jun 30 2015 14:32:47 GMT+0200 (Romance Daylight Time)

var _ = require('lodash');

function filesArray(){
    var vendorJsFiles = [
       'www/lib/ionic/js/ionic.bundle.js'
    ];

    var mockJsFiles = [
       'node_modules/angular-mocks/angular-mocks.js',
    ];

    var appJsFiles = [
       'www/app/*.js',
       'www/app/**/*.js'
    ];

    return _.union(vendorJsFiles, mockJsFiles, appJsFiles);
}

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
	  files: filesArray(),

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: [],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
