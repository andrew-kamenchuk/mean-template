"use strict";

const config = require("./config");
const logger = require("./service/logger");

const fs = require("fs");

const express = require("express");

// middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const HttpError = require("./errors").HttpError;

const ROOT = config.get("ROOT");

const app = express();

app.set("env", config.get("env"));

app.engine("html", require("twig").renderFile);

app.set("view engine", "html");
app.set("views", [ROOT + "/views"]);

app.use("/public", compression(), express.static(ROOT + "/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    secret: config.get("express:session:secret"),
    resave: false,
    saveUninitialized: false,
}));

app.use(methodOverride());

// access log
app.use(morgan("combined", {
    stream: fs.createWriteStream(ROOT + "/access.log", {flags: "a"}),
}));

app.use(helmet());

// routes
fs.readdirSync(ROOT + "/routes").forEach(route => {
    require("./routes/" + route).boot(app);
});

// catch all handler
app.route("*").all(function(request, response, next) {
    next(new HttpError(404, "Not Found"));
});

// error handling
app.use((error, request, response, next) => {
    // jshint unused: false

    const status = error.status || 500;
    response.status(status);

    if (!(error instanceof HttpError) || error.isServerError()) {
        logger.error(error);
    }

    if (request.xhr) {
        response.json(error);
    } else {
        response.render("error", {
            status: status,
            message: error.message,
        });
    }
});

module.exports = app;
