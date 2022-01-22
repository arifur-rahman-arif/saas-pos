const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/user/user");
const sendMail = require("../utils/emails/sendMail");
const jwt = require("jsonwebtoken");

const verifyUserController = {
    verifyUser: async (req, res, next) => {
        // Assign properties
        this.req = req;
        this.res = res;
        this.next = next;

        try {
            let authToken = this.req.params.authToken;

            if (!authToken) return this.next(new ErrorResponse("Auth Token is not found", 404));

            jwt.verify(authToken, process.env.JWT_SECRET, async (err, token) => {
                if (err) {
                    return this.next(new ErrorResponse("Auth Token is not valid or it is expired", 401));
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
    },
};

module.exports = verifyUserController;
