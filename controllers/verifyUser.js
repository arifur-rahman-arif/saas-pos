const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/user/user");
const sendMail = require("../utils/emails/sendMail");
const jwt = require("jsonwebtoken");

class VerifyUser {
    async verifyUser(req, res, next) {
        // Assign properties
        this.req = req;
        this.res = res;
        this.next = next;

        try {
            let authToken = this.req.params.authToken;

            if (!authToken) return this.next(new ErrorResponse("Auth Token is not found", 404));

            jwt.verify(authToken, process.env.JWT_SECRET, async (err, token) => {
                if (err) {
                    return this.next(
                        new ErrorResponse("Auth Token is not valid or it is expired", 401)
                    );
                }

                let userID = token.id;

                let doc = await User.findById(userID);

                if (doc.status.isVerified) {
                    return this.next(new ErrorResponse("User is already verified", 401));
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
                    return this.res.status(201).json({
                        code: 201,
                        status: "success",
                        message: "User verified successfully",
                    });
                } else {
                    return this.next(new ErrorResponse("User is not found to validate", 404));
                }
            });
        } catch (error) {
            this.next(error);
        }
    }

    async sendResponse() {
        const { email } = this.req.body;

        if (!verifyUserController.user)
            return this.next(new ErrorResponse("User don't exists", 404));

        try {
            const token = verifyUserController.user.getSignedJwtToken();

            let url = `${this.req.protocol}://${this.req.get("host")}${
                this.req.originalUrl
            }?authToken=${token}`;

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
                this.res.status(201).json({
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
    }
}

const verifyUserController = new VerifyUser();

module.exports = verifyUserController;
