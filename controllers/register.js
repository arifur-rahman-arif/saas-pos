const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/user/user");
const sendMail = require("../utils/emails/sendMail");

const registerController = {
    register: async (req, res, next) => {
        // Assign the parameter
        this.req = req;
        this.res = res;
        this.next = next;

        try {
            this.user = User(this.req.body);

            this.user.save(function (err, result) {
                if (err) {
                    return this.next(new ErrorResponse(err, 400));
                } else {
                    this.sendResponse(req, res, next);
                }
            });
        } catch (error) {
            this.next(error);
        }
    },

    sendResponse: async () => {
        const { email } = this.req.body;

        if (!this.user) return this.next(new ErrorResponse("User don't exists", 404));

        try {
            const token = this.user.getSignedJwtToken("1d");

            let url = `${this.req.protocol}://${this.req.get("host")}${this.req.originalUrl}/${token}`;

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
                return this.res.status(201).json({
                    code: 201,
                    status: "success",
                    token,
                    message: "User created successfully",
                });
            } else {
                return this.next(new ErrorResponse("Mail could not be sent", 400));
            }
        } catch (error) {
            this.next(error);
        }
    },
};

module.exports = registerController;
