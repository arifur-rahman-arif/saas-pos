const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/user/user");
const sendMail = require("../utils/emails/sendMail");
const jwt = require("jsonwebtoken");

const verifyUserController = {
    user: null,

    verifyUser: async (req, res, next) => {
        try {
            let authToken = req.params.authToken;

            if (!authToken) return next(new ErrorResponse("Auth Token is not found", 404));

            jwt.verify(authToken, process.env.JWT_SECRET, async (err, token) => {
                if (err) {
                    return next(new ErrorResponse("Auth Token is not valid or it is expired", 401));
                }

                let userID = token.id;

                let doc = await User.findById(userID);

                if (doc.status.isVerified) {
                    return next(new ErrorResponse("User is already verified", 401));
                }

                let userDoc = await User.findByIdAndUpdate(userID, {
                    status: {
                        active: true,
                        onHold: false,
                        restricted: false,
                        isVerified: true,
                    },
                });

                if (userDoc) {
                    return res.status(201).json({
                        code: 201,
                        status: "success",
                        response: "User verified successfully",
                    });
                } else {
                    return next(new ErrorResponse("User is not found to validate", 404));
                }
            });
        } catch (error) {
            next(error);
        }
    },

    sendResponse: async (req, res, next) => {
        const { email } = req.body;

        if (!verifyUserController.user) return next(new ErrorResponse("User don't exists", 404));

        try {
            const token = verifyUserController.user.getSignedJwtToken();

            let url = `${req.protocol}://${req.get("host")}${req.originalUrl}?authToken=${token}`;

            let message = `
                Click <a href="${url}">here</a> to verify your account or open this url to your browser
                ${url}
            `;

            let mail = await sendMail({
                toEmail: email,
                subject: "Account Verification",
                message,
            });

            if (mail) {
                res.status(201).json({
                    code: 201,
                    status: "success",
                    token,
                    message: "User created successfully",
                });
            } else {
                return next(new ErrorResponse("Mail could not be sent", 400));
            }
        } catch (error) {
            next(error);
        }
    },
};

module.exports = verifyUserController;
