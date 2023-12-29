class ApiError extends Error {
    constructor(statusCode, message, messageFR, isOperational = true, stack = '') {
        super(message);
        this.messageFR = messageFR;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = ApiError;