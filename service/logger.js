"use strict";

const config = require("../config");
const winston = require("winston");

const transports = [];

transports.push(new winston.transports.Console({
    level: config.get("env") == "dev" ? "debug" : "info",
    showLevel: true,
    colorize: true,
    timestamp: config.get("winston:timestamp"),
    handleExceptions: true,
    humanReadableUnhandledException: true,
}));

transports.push(new winston.transports.File({
    filename: config.get("winston:errlog"),
    level: "error",
    timestamp: config.get("winston:timestamp"),
    handleExceptions: true,
    humanReadableUnhandledException: true,
}));

module.exports = new winston.Logger({
    transports: transports,
});
