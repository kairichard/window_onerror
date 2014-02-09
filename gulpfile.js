var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat')


gulp.task('build', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('window_onerror.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

