const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/user/user");
const sendMail = require("../utils/emails/sendMail");

const registerController = {
    user: null,

    register: async (req, res, next) => {
        try {
            registerController.user = User(req.body);

            registerController.user.save(function (err, result) {
                if (err) {
                    return next(new ErrorResponse(err, 400));
                } else {
                    registerController.sendResponse(req, res, next);
                }
            });
        } catch (error) {
            next(error);
        }
    },

    sendResponse: async (req, res, next) => {
        const { email } = req.body;

        if (!registerController.user) return next(new ErrorResponse("User don't exists", 404));

        try {
            const token = registerController.user.getSignedJwtToken("1d");

            let url = `${req.protocol}://${req.get("host")}${req.originalUrl}/${token}`;

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
                return res.status(202).json({
                    code: 202,
                    status: "success",
                    token,
                    response: "User created successfully",
                });
            } else {
                return next(new ErrorResponse("Mail could not be sent", 400));
            }
        } catch (error) {
            next(error);
        }
    },
};

module.exports = registerController;
