"use strict";

module.exports = (gulp, config) => () => gulp
    .src(config.get("ROOT") + "/node_modules/font-awesome/{css,fonts}/*")
    .pipe(gulp.dest(config.get("ROOT") + "/public/vendor/font-awesome"));
