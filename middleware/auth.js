const User = require("../models/user/user");
const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");

const authMiddleware = {
    isUserExists: async (req, res, next) => {
        const { userName, email } = req.body;

        const user = await User.find({
            $or: [{ userName }, { email }],
        });

        if (user.length) return next(new ErrorResponse("Username or email already exits", 400));

        next();
    },

    hasCapabitlities: async (req, res, next) => {
        const { userName, email } = req.body;

        if (!userName || !email) {
            return next(new ErrorResponse("Username and email is required", 400));
        }

        const userDoc = await User.findOne({
            userName,
            email,
        });

        if (!userDoc.status.active || !userDoc.status.isVerified) {
            return next(new ErrorResponse("User account is not verifed or in-active", 401));
        }

        if (userDoc.userRole !== "admin" || userDoc.userRole !== "shopAdmin") {
            return next(new ErrorResponse("Forbidden to remove session", 403));
        }

        next();
    },

    verifySession: async (req, res, next) => {
        try {
            let userID = "";

            if (!req.session?.userID) {
                req.session.destroy();
                return next(new ErrorResponse("User session is not found", 403));
            }

            userID = req.session.userID;

            let userDoc = await User.findById(userID);

            if (!userDoc) return next(new ErrorResponse("User session is not valid", 403));

            if (!userDoc.status.isVerified) {
                return next(new ErrorResponse("User is not verified", 401));
            }

            req.userID = userID;

            next();
        } catch (err) {
            next(err);
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
                }

                next();
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = authMiddleware;
