'use strict'

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'public/lib/angular/angular.js',
            'public/lib/angular-resource/angular-resource.js',
            'public/lib/angular-route/angular-route.js',
            'public/lib/angular-mocks/angular-mocks.js',
            'public/application.js',
            'public/*[!lib]*/*.js',
            'public/*[!lib]*/*[! tests]*/*.js',
            'public/*[!lib]*/tests/unit/*.js',
            'public/core/**/*.html'
        ],
        preprocessors: {
            'public/core/**/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            moduleName: 'mean',

            cacheIdFromPath: function (filepath) {
                return filepath;
            }
        },
        logLevel: config.LOG_INFO,
        reporters: ['progress'],
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: true,
        plugins: [
            'karma-ng-html2js-preprocessor',
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ]
    });
};