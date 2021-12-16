const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/user/user");
const sendMail = require("../utils/emails/sendMail");
const jwt = require("jsonwebtoken");

const forgotPasswordController = {
    sendToken: async (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email || email.length < 1) {
                return next(new ErrorResponse("Email is required", 400));
            }

            const userDoc = await User.findOne({
                email,
            });

            if (!userDoc) {
                return next(new ErrorResponse("User not found", 404));
            }

            let url = `${req.protocol}://${req.get("host")}/reset-password/`;

            if (environment === "development") {
                url = process.env.CLIENT_URL + "reset-password/";
            }

            const token = userDoc.getSignedJwtToken("1d");

            url = url += token;

            let message = `
                Click <a href="${url}">here</a> to reset you password. Or open this url in your browser
                ${url}
            `;

            let mail = await sendMail({
                toEmail: email,
                subject: "Password Reset",
                message,
            });

            if (mail) {
                return res.status(200).json({
                    code: 200,
                    status: "success",
                    message: "Please check you mail to reset password",
                });
            } else {
                return next(new ErrorResponse("Mail could not be sent", 400));
            }
        } catch (error) {
            next(error);
        }
    },
};

module.exports = forgotPasswordController;
