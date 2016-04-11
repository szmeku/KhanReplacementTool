'use strict';

var gulp = require('gulp'),
    $ = require('./common').$;

gulp.task('serve', ['build'], function () {

    $.connect.server({
        livereload: true,
        port: 8080,
        root: ['dist']
    });

    gulp.watch(['./src/**/*.{js, html, css}', './src/**/*.html'], ['rebuild-and-reload-server']);
});

gulp.task('rebuild-and-reload-server', ['build'], function () {

    return gulp.src('./dist').pipe($.connect.reload());
});