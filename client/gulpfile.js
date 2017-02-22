'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('images', function() {
    return gulp.src('./client/dist/images/**/*', {base: '.'})
        .pipe(imagemin())
        .pipe(gulp.dest('./assets'))
});

gulp.task('default', ['sass'], function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./dist/assets/images/**/*.+(jpg|jpeg|gif|png)', ['images']);
    //gulp.watch('./**/*.html';, ['html']);
    //gulp.watch('./js/**/*', ['js']);
});
