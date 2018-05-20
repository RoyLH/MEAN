'use strict';

module.exports = (config) => {
    config.set({
        frameworks: ['jsamine'],
        files :[
            '/public/lib/angular/angular.js',
            '/public/lib/angular-resource/angular-resource.js',
            '/public/lib/angular-route/angular-route.js',
            '/public/lib/angular-mocks/angular-mocks.js',
            '/public/*[!lib]*/*.js',
            '/public/*[!lib]*/*[!tests]*/*.js',
            '/public/*[!lib]*/tests/unit/*.js',
        ],
        reporters: ['progress'],
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        sigleRun: true
    });
};