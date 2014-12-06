/**
 * Created by jy25 on 12/6/2014.
 */

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var del = require('del');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');

/**
 * Clean dist folder
 */
gulp.task('clean', function(cb) {
  del(['dist/**/*'], cb)
});

/**
 * prepare task before start program
 */
gulp.task('prepare', ['clean'], function(){
  gulp.start('coffee', 'copy');
});


/**
 * compile coffee script
 */
gulp.task('coffee', function() {
  gulp.src('./src/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./dist/'))
    .pipe(notify({message: "Compiler coffee complete."}))
});

/**
 * copy some project file
 */
gulp.task('copy', function() {
  gulp.src('./src/config.json')
    .pipe(gulp.dest('./dist/'))
    .pipe(notify({message: "Copy file complete."}))
});

/**
 * start server
 */
gulp.task('develop', function () {
  nodemon(
    {
      script: 'dist/index.js',
      ext: 'coffee json js',
      ignore: [
        "node_modules/**/node_modules"
      ],
      nodeArgs: ['--debug'],
      watch: [
        "src/"
      ]
    })
    .on('change', ['prepare'])
    .on('restart', function () {
      notify({message: "Start server."})
    })
});


/**
 * default task
 */
gulp.task('default', ['prepare'], function(){
  gulp.start('develop');
});