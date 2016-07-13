var gulp = require('gulp'),
sass = require('gulp-sass'),
clean = require('gulp-clean');

gulp.task('sass', function () {
    gulp.src('scss/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('static/css'))
});

gulp.task('clean', function () {
    gulp.src('static/css/*.css', {read: false})
        .pipe(clean());
});

gulp.task('watch', function () {
    gulp.watch(['scss/*.scss'], ['sass']);
});

gulp.task('default',['clean','sass','watch']);
