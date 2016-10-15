"use strict";

module.exports = (gulp, config) => () => {
    gulp
        .src(config.get("ROOT") + "/node_modules/bootstrap/dist/{css,fonts}/*")
        .pipe(gulp.dest(config.get("ROOT") + "/public/vendor/bootstrap"));
};

module.exports.deps = ["jquery-bootstrap"];
