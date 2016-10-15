"use strict";

const nconf = require("nconf");

const path = require("path");

nconf.env();

nconf.file("options", {file: "options.json", dir: __dirname, search: true});

nconf.argv();

nconf.set("ROOT", path.resolve(__dirname, "../"));

if (!nconf.get("env")) {
    nconf.set("env", process.env.NODE_ENV || "development");
}

module.exports = nconf;
