"use strict";

module.exports = (gulp, config) => {
    const browserifyStr = require("browserify-string");
    const source        = require("vinyl-source-stream");
    const uglify        = require("gulp-uglify");
    const buffer        = require("gulp-buffer");

    return () => {
        const b = browserifyStr("module.exports = global.angular = require(\"angular\"); require(\"angular-route\")");

        const bundleStream = b
            .require("angular")
            .bundle();

        return bundleStream
            .pipe(source("angular.min.js"))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(config.get("ROOT") + "/public/vendor/angular"));
    };
};
