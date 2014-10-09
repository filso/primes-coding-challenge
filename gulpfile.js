var gulp = require('gulp');
var fs = require('fs');

var concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  stylish = require('jshint-stylish'),
  jshint = require('gulp-jshint'),
  clean = require('gulp-clean'),
  cache = require('gulp-cached'),
  linker = require('gulp-linker'),
  runSequence = require('run-sequence'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  _ = require('lodash-node'),
  karma = require('karma').server;

var karmaConfigFile = __dirname + '/test/karma.conf.js';

/**
 * Run test once and exit
 */
gulp.task('test', function(done) {
  karma.start({
    configFile: karmaConfigFile,
    singleRun: true
  }, done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function(done) {
  karma.start({
    configFile: karmaConfigFile
  }, done);
});

var paths = {
  scripts: ['app/scripts/**/*.js'],
  scriptsWithoutTests: ['app/scripts/**/*.js', '!app/scripts/**/*_test.js'],
  templates: {
    index: ['app/index.html'],
    html: ['app/index.html', 'app/template/**/*.html'],
    jade: ['app/template/**/*.jade']
  },
  styles: {
    main: 'app/styles/**/*.scss',
    css: 'app/styles/*.css'
  },
  notLinted: ['!app/scripts/templates.js']
};

// Error-handler for gulp-plumber
var onError = function(err) {
  gutil.beep();
  console.log(err);
};

////////////////////////////
/// Development tasks
///
var developTasks = ['connect', 'preprocess', 'watch'];
gulp.task('develop', developTasks);

gulp.task('no-karma', function() {
  var index = developTasks.indexOf('karma');
  developTasks.splice(index, 1);
  gulp.start('develop');
});


gulp.task('preprocess', ['sass']);
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['develop']);

/**
 * Setup a server to preview the app.
 * Has middleware that forwards certain API calls to a different server.
 */
gulp.task('connect', connect.server({
  root: ['app'],
  port: 9000,
  // livereload: true
}));


gulp.task('sass', function() {
  return gulp.src('./app/styles/main.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({}))
    .on('error', gutil.log)
    .pipe(gulp.dest('./app/styles'));
});


gulp.task('lint', function() {
  return gulp.src(paths.scripts.concat(paths.notLinted))
    .pipe(cache('lint'))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, function(file) {
    gulp.src(file.path)
      .pipe(connect.reload(file.path));
  });

  gulp.watch(paths.styles.css, ['reloadStyles']);
  gulp.watch(paths.templates.jade, ['jade']);
  gulp.watch('app/styleguide/*.jade', ['styleguide']);
  gulp.watch(paths.styles.main, ['sass']);

  gulp.watch(paths.scriptsWithoutTests, function(event) {
    if (event.type === 'added' || event.type === 'deleted') {
      gulp.start('linker');
    }
  });
});

gulp.task('reloadJs', function() {
  return gulp.src(paths.scripts)
    .pipe(connect.reload());
});

gulp.task('reloadStyles', function() {
  gulp.src(paths.styles.css)
    .pipe(connect.reload());
});

gulp.task('linker', function() {
  return gulp.src('app/index.html')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(linker({
      scripts: ['app/scripts/**/*.js', '!app/scripts/app.js', '!app/scripts/**/*_test.js'],
      startTag: '<!--SCRIPTS-->',
      endTag: '<!--SCRIPTS END-->',
      fileTmpl: '<script src="%s"></script>',
      appRoot: 'app/'
    }))
    .pipe(gulp.dest('app/'));
});

