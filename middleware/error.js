const ErrorResponse = require("../utils/ErrorResponse");

const error = {
    routeError: (req, res, next) => {
        res.status(404).send({
            code: 404,
            status: "error",
            error: `Api route not found for ${req.headers.host + req.url}`,
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

        console.log(err);

        res.status(error.statusCode || 500).json({
            code: error.statusCode,
            status: "error",
            error: error.message || "Server Error",
        });
    },
};

module.exports = error;
