var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var concat = require('gulp-concat-util');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
var templateCache = require('gulp-angular-templatecache');

var coreSequence = ['sass','appJS','vendorJS','vendorCSS','build-templates']

gulp.task('default', function(cb){
  runSequence(coreSequence,'index',cb);
});

gulp.task('watch', function() {
  gulp.watch(['./src/**'], function(){
      runSequence(coreSequence,'index',cb);
  });
});

gulp.task('sass', function(done) {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('appJS', function() {
  gulp.src('./src/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/js'))
});

gulp.task('vendorJS', function() {
  gulp.src('./src/vendor/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./www/js'))
});

gulp.task('vendorCSS', function() {
  gulp.src('./vendors/**/*.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./www/css'))
});

gulp.task('index', function () {
  var target = gulp.src('./src/index.html');
  var sources = gulp.src(['./www/js/*.js', './www/css/*.css'], {read: false});
  return target.pipe(inject(sources, {relative: false, ignorePath: '/www/'}))
    .pipe(gulp.dest('./www'));
});

gulp.task('build-templates', function () {
  return gulp.src('./src/**/*.html')
   .pipe(templateCache({module:'app'}))
   .pipe(concat('templates.js'))
   .pipe(gulp.dest('./www/js'));
});
