module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            'hm6/test/1-index.js',
            'hm6/test/2-towns.js'
        ],
        preprocessors: {
            'hm6/test/**/*.js': ['webpack', 'sourcemap'],
        },
        webpack: require('./webpack.config.test'),
        webpackMiddleware: {
            stats: 'errors-only'
        },
        reporters: ['mocha'],
        port: 9876,
        browsers: ['Firefox'],
        captureTimeout: 60000,
        singleRun: false,
        plugins: [
            require('karma-mocha'),
            require('karma-webpack'),
            require('karma-mocha-reporter'),
            require('karma-firefox-launcher'),
            require('karma-sourcemap-loader')
        ]
    });
};
