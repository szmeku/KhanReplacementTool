'use strict';

var gulp = require('gulp'),
    $ = require('./common').$,
    babel = require('babel-core'),
    webmake = require('webmake'),
    path = require('path'),
    _ = require('ramda'),
    mkdirp = require('mkdirp'),
    helpers = require('./helpers');


function transpileES6ToES5(code) {

    return babel.transform(code, {
        sourceMaps: "inline",
        presets: ["es2015"]
    })
}


gulp.task('build', ['create-dist-directory', 'copy-images', 'copy-htmls', 'copy-manifest', 'webmake']);

gulp.task('create-dist-directory', function (cb) {

    mkdirp('./dist', function (err) {
        if (err) {
            console.error(err);
        }

        cb(err);
    })
});

gulp.task('copy-images', function () {

    return gulp.src(['src/**/*.{jpg,png,gif}'])
        .pipe($.flatten())
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('copy-htmls', function () {

    return gulp.src(['src/index.html'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-manifest', function () {
    return gulp.src(['src/manifest.json'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('webmake', function () {

    return webmake('src/index.js', {
        cache: true,
        sourceMap: true,
        output: 'dist/bundle.js',
        transform: function (fileName, code) {

            if (_.allPass([
                    helpers.fileExtensionIs('.js'),
                    helpers.fileInFolder('./src')
                ])(fileName)) {

                var transformedCode = transpileES6ToES5(code);

                return transformedCode.code;
            }

            return code;
        },
        ignoreErrors: true
    });

});