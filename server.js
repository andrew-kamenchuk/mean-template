"use strict";

const config   = require("./config");
const app      = require("./app");
const logger   = require("./service/logger");

require("http").createServer(app).listen(config.get("server:port"), config.get("server:host"), () => {
    logger.info("server started");
});
