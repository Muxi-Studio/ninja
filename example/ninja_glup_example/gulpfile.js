var gulp = require('gulp'),
sass = require('gulp-sass'),
clean = require('gulp-clean'),
livereload = require('gulp-livereload'),
browserify = require("browserify"),
sourcemaps = require("gulp-sourcemaps"),
source = require('vinyl-source-stream'),
buffer = require('vinyl-buffer');

gulp.task('sass', function () {
    gulp.src('scss/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('static/css'))
        .pipe(livereload()); 
});

gulp.task("browserify", function () {
    var b = browserify({
        entries: "js/index.js",
        debug: true
    });

    return b.bundle()
        .pipe(source("index.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("static/js"))
        .pipe(livereload());
});

gulp.task('clean', function () {
    gulp.src('static/css/*.css', {read: false})
        .pipe(clean());
    gulp.src('static/js/*.js', {read: false})
        .pipe(clean());
    gulp.src('static/images/*', {read: false})
        .pipe(clean());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['scss/*.scss'], ['sass']);
    gulp.watch(['js/*.js'],['browserify']);
});

//否则只需运行gulp
gulp.task('default',['clean','sass','browserify','watch']);
