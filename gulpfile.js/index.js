"use strict";

const gulp = require("gulp");
const config = require("../config");

const tasks = require("require-dir")("./tasks", {recurse: false});

Object.keys(tasks).forEach(name => {
    const task = tasks[name](gulp, config);
    const deps = tasks[name].deps || [];

    gulp.task(name, deps, task);
});
