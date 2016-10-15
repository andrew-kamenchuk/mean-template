"use strict";

module.exports = (gulp, config) => {
    const ROOT = config.get("ROOT");

    const browserify = require("browserify");
    const buffer     = require("gulp-buffer");
    const stream     = require("vinyl-source-stream");
    const uglify     = require("gulp-uglify");
    const babelify   = require("babelify");

    return () => {
        gulp.src(ROOT + "/routes/users/client/templates/*.html")
            .pipe(gulp.dest(ROOT + "/public/users/templates"));

        browserify([require.resolve("babel-polyfill"), ROOT + "/routes/users/client/app.js"])
            .transform(babelify, {presets: ["es2015"]})
            .external("angular")
            .bundle()
            .pipe(stream("app.js"))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(ROOT + "/public/users"));
    };
};

module.exports.deps = ["ng"];
