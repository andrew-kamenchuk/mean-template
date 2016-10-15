"use strict";

const mongoose = require("mongoose");
const db = require("../service/mongoose").db;

const uniqueValidator = require("mongoose-unique-validator");

const crypto   = require("crypto");

const isEmail = require("validator").isEmail;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    salt: {
        type: String,
        required: true,
    },

    hashed_password: {
        type: String,
        required: true,
    }
});

UserSchema.plugin(uniqueValidator);

UserSchema.path("email").validate(isEmail, "Email is invalid!");

function makeSalt() {
    return new Date().getTime().toString(0x10);
}

function encrypt(password, salt, algo = "sha256") {
    return crypto.createHmac(algo, salt).update(password).digest("hex");
}

UserSchema.methods.verify = function(password) {
    return this.hashed_password == encrypt(password, this.salt);
};

UserSchema.virtual("password").set(function(password) {
    this.hashed_password = encrypt(password, this.salt = makeSalt());
});

module.exports = db.model("User", UserSchema);
