module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            'hm6/test/**/*.js'
        ],
        preprocessors: {
            'hm6/test/**/*.js': ['webpack', 'sourcemap']
        },
        webpack: require('./webpack.config.test'),
        webpackMiddleware: {
            stats: 'errors-only'
        },
        reporters: ['mocha'],
        port: 9876,
        browsers: ['Chrome'],
        captureTimeout: 20000,
        singleRun: false,
        plugins: [
            require('karma-mocha'),
            require('karma-webpack'),
            require('karma-mocha-reporter'),
            require('karma-chrome-launcher'),
            require('karma-sourcemap-loader')
        ]
    });
};
