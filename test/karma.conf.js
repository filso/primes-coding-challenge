module.exports = function(config) {
  config.set({
    basePath: '../app',
    files: [
      'bower_components/jquery/jquery.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',

      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',

      'bower_components/angular-route/angular-route.js',

      'bower_components/lodash/dist/lodash.js',

      'scripts/app.js',
      'scripts/**/*.js'
    ],
    preprocessors: {},
    browserNoActivityTimeout: 20000,
    exclude: [],
    frameworks: ['jasmine'],
    reporters: ['progress'],
    runnerPort: 9100,
    colors: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000
  });
};