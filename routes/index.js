"use strict";

module.exports.boot = function(app) {
    app.get("/", function(request, response) {
        const user = request.session.user;

        if (undefined === user) {
            return response.redirect("/users/");
        }

        response.render("index", {
            username: user.name,
        });
    });
};
