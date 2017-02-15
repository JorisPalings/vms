'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

gulp.task('sass', function() {
 return gulp.src('./sass/**/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./assets/css'));
});

gulp.task('images', function() {
 return gulp.src('./images/**/*', {base: '.'})
   .pipe(imagemin())
   .pipe(gulp.dest('./assets'))
});

gulp.task('default', function () {
    return gulp.src('./**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});