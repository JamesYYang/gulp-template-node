/**
 * Created by jy25 on 12/6/2014.
 */

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var del = require('del');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var replace = require('gulp-replace');
var argv = require('yargs').argv;

/**
 * Clean dist folder
 */
gulp.task('clean', function(cb) {
  del(['dist/**/*.js', 'dist/**/*.json'], cb);
});


/**
 * compile coffee script
 */
gulp.task('coffee', ['clean'], function() {
  var port = argv.port || 8201
  return gulp.src('./src/**/*.coffee')
    .pipe(replace("port_for_argv", port))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./dist/'))
    .pipe(notify({message: "Compiler coffee complete."}));
});

/**
 * copy some project file
 */
gulp.task('copy', ['clean'], function() {
  return gulp.src('./src/config.json')
    .pipe(gulp.dest('./dist/'))
    .pipe(notify({message: "Copy file complete."}));
});

/**
 * build
 */
gulp.task('build', ['clean', 'coffee', 'copy']);


/**
 * start server
 * do not using nodemon to watch file.
 */
var nodemon_instance;

gulp.task('serve', function () {
  if(!nodemon_instance){
    nodemon_instance = nodemon(
      {
        script: 'dist/index.js',
        ext: 'none'
      })
      .on('restart', function () {
        console.log("restart server......................")
      });
  } else{
    nodemon_instance.emit("restart");
  }

});

gulp.task('serve_watch', ['serve'], function() {
  return gulp.watch('src/**/*', ['restart']);
});


/**
 * default task
 */
gulp.task('default', ['build'], function(){
  gulp.start('serve_watch');
});

/**
 * task when files change
 */
gulp.task('restart', ['build'], function(){
  gulp.start('serve');
});