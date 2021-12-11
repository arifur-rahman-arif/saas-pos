const User = require("../models/user/user");
const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");

const authMiddleware = {
    isUserExists: async (req, res, next) => {
        const { userName, email } = req.body;

        const user = await User.find({
            userName,
            email,
        });

        if (user.length) return next(new ErrorResponse("Username or email already exits", 400));

        next();
    },

    verifyCookieToken: (req, res, next) => {
        let authToken = "";

        if (!req.signedCookies?.authToken) {
            return next(new ErrorResponse("Token is not found", 400));
        }

        authToken = req.signedCookies?.authToken;

        if (!authToken) {
            return next(new ErrorResponse("Not authorized to access this route", 401));
        }

        try {
            jwt.verify(authToken, process.env.JWT_SECRET, async (err, token) => {
                if (err) {
                    return next(new ErrorResponse("Auth Token is not valid or it is expired", 401));
                }
                let userID = token.id;
                let userDoc = await User.findById(userID);

                if (!userDoc) return next(new ErrorResponse("User is not found to validate", 404));

                if (!userDoc.status.isVerified) {
                    return next(new ErrorResponse("User is not verified", 401));
                } else {
                    return res.status(201).json({
                        code: 200,
                        status: "success",
                        response: "Token verified successfully",
                    });
                }
            });
        } catch (err) {
            return next(new ErrorResponse("Not authorized to access this route", 401));
        }
    },

    verifyToken: (req, res, next) => {
        let authToken = "";

        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            return next(new ErrorResponse("Token is not found", 400));
        }

        authToken = req.headers.authorization.split(" ")[1];

        if (!authToken) {
            return next(new ErrorResponse("Not authorized to access this route", 401));
        }

        try {
            jwt.verify(authToken, process.env.JWT_SECRET, async (err, token) => {
                if (err) {
                    return next(new ErrorResponse("Auth Token is not valid or it is expired", 401));
                }
                let userID = token.id;
                let userDoc = await User.findById(userID);
                if (!userDoc) return next(new ErrorResponse("User is not found to validate", 404));
                if (!userDoc.status.isVerified) {
                    return next(new ErrorResponse("User is not verified", 401));
                } else {
                    return res.status(201).json({
                        code: 200,
                        status: "success",
                        response: "Token verified successfully",
                    });
                }
            });
        } catch (err) {
            return next(new ErrorResponse("Not authorized to access this route", 401));
        }
    },
};

module.exports = authMiddleware;
