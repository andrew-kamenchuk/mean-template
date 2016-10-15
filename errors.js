"use strict";

module.exports.HttpError = class HttpError extends Error {
    constructor(status, message) {
        super(message);

        this.status = status;

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }

    isClientError() {
        return this.status >= 400 && this.status < 500;
    }

    isServerError() {
        return this.status >= 500;
    }
};
