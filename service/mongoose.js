"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const config = require("../config");

for (const dbName of config.get("mongoose:dbs")) {
    module.exports[dbName] = mongoose
        .createConnection(config.get("mongoose:uri") + dbName, config.get("mongoose:options"));
}
