"use strict";

const express = require("express");

const User = require("../../models/user");

const HttpError = require("../../errors").HttpError;

module.exports.boot = function(app) {
    const router = express.Router();

    router.get("/logout", function(request, response) {
        request.session.destroy();
        response.redirect("/");
    });

    router.use(function(request, response, next) {
        if (undefined !== request.session.user) {
            return response.redirect("/");
        }

        next();
    });

    router
        .get("/", function(request, response) {
            response.render("users/index", {});
        })

        .post("/login", function(request, response) {
            const email = request.body.email;
            const password = request.body.password;

            User.findOne({email: email}, function(error, user) {
                let status = false;
                const errors = { email: [], password: [], };

                if (error || !user) {
                    errors.email.push("Email is invalid / Account does not exists");
                } else if (!user.verify(password)) {
                    errors.password.push("Password is invalid");
                } else {
                    request.session.user = user;
                    status = true;
                }

                response.json({status: status, errors: errors});
            });
        })

        .post("/register", function(request, response, next) {
            const user = new User(request.body);

            user.save(function(error, user) {
                let status = false;
                const errors = {email: [], password: [], name: []};

                if (error && error.errors) {
                    if (error.errors.email) {
                        errors.email.push(error.errors.email.message);
                    }

                    if (error.errors.password) {
                        errors.password.push(error.errors.password.message);
                    }

                    if (error.errors.name) {
                        errors.name.push(error.errors.name.message);
                    }

                } else if (error || !user) {
                    next(new HttpError(500));
                } else {
                    status = true;
                    request.session.user = user;
                }

                response.json({status: status, errors: errors});
            });

        });

    app.use("/users", router);
};
