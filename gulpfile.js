/**
 * Created by jy25 on 12/6/2014.
 */

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var del = require('del');
var replace = require('gulp-replace');
var argv = require('yargs').argv;
var server = require( 'gulp-develop-server' );
var runSequence = require('run-sequence');

/**
 * Clean dist folder
 */
gulp.task('clean', function(cb) {
  del(['dist/**/*.js', 'dist/**/*.json'], cb);
});


/**
 * compile coffee script
 */
gulp.task('coffee', function() {
  var port = argv.port || 8201
  return gulp.src('./src/**/*.coffee')
    .pipe(replace("port_for_argv", port))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./dist/'));
});

/**
 * copy some project file
 */
gulp.task('copy', function() {
  return gulp.src('./src/config.json')
    .pipe(gulp.dest('./dist/'));
});


/**
 * start server
 */
gulp.task('serve', function () {
  server.listen(
    {
      path: 'dist/index.js',
      execArgv: ['--harmony'] //for ES6
    });
});

gulp.task('server-restart', function(){
  server.restart();
})

/**
 * Watch files
 */
gulp.task('watch', function(){
  gulp.watch([
    'src/**/*.coffee',
    'src/**/*.js'
    ], {debounceDelay: 2000}, ['reload'])
});

/**
 * restart server when file changes
 */
gulp.task('reload', function(callback){
  runSequence('clean',
    ['copy', 'coffee'],
    'server-restart',
    callback);
});


/**
 * default task
 */
gulp.task('default', function(callback){
  runSequence('clean',
    ['copy', 'coffee'],
    'serve',
    'watch',
    callback);
});