const ErrorResponse = require("../utils/ErrorResponse");
const errorCodes = require("./errorCodes");

const error = {
    routeError: (req, res, next) => {
        res.status(404).send({
            code: errorCodes["404"],
            status: "error",
            message: `Api route not found for ${req.headers.host + req.url}`,
        });
    },

    errorHandler: (err, req, res, next) => {
        let error = { ...err };

        error.message = err.message;

        if (err.code === 11000) {
            const message = `Duplicate value entered`;
            error = new ErrorResponse(message, 400);
        }

        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map((val) => val.message);
            error = new ErrorResponse(message, 400);
        }

        res.status(error.statusCode || 500).json({
            code: errorCodes[error.statusCode],
            status: "error",
            message: error.message || "Server Error",
        });
    },
};

module.exports = error;
