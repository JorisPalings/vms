'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

gulp.task('sass', function() {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/assets/css'));
});

// Base option maintains folder structure
gulp.task('images', function() {
    return gulp.src('./assets/images/**/*', {base: '../client/assets/images'})
        .pipe(imagemin())
        .pipe(gulp.dest('../dist/assets/images'))
});

gulp.task('default', ['sass'], function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./dist/assets/images/**/*.+(jpg|jpeg|gif|png)', ['images']);
    //gulp.watch('./**/*.html';, ['html']);
    //gulp.watch('./js/**/*', ['js']);
});
