const User = require("../models/user/user");
const ErrorResponse = require("../utils/ErrorResponse");
const { OAuth2Client } = require("google-auth-library");
const sendMail = require("../utils/emails/sendMail");

const loginController = {
    login: async (req, res, next) => {
        try {
            const { userName, email, password, keepMeLoggedIn } = req.body;

            if (!password) {
                return next(new ErrorResponse("Password is required", 404));
            }

            if (!userName && !email) {
                return next(new ErrorResponse("Username or email is required", 404));
            }

            let data;

            if (userName?.length > 0) {
                data = {
                    userName,
                };
            } else if (email?.length > 0) {
                data = {
                    email,
                };
            } else {
                return next(new ErrorResponse("Username or email is required", 404));
            }

            const userDoc = await User.findOne(data).select(["password", "status"]);

            if (!userDoc) return next(new ErrorResponse("User don't exists", 404));

            let isPasswordMatch = await userDoc.matchPassword(password);

            if (!isPasswordMatch) return next(new ErrorResponse("Invalid credentials", 401));

            if (!userDoc.status.active || !userDoc.status.isVerified) {
                return next(new ErrorResponse("User account is not verifed or in-active", 401));
            }

            const expirationTime = 60 * 60 * 24 * 10 * 1000;

            if (userDoc?._id) {
                if (keepMeLoggedIn) {
                    req.session.cookie.maxAge = expirationTime;
                }

                req.session.userID = userDoc._id;

                return res.status(200).json({
                    code: 200,
                    status: "success",
                    message: "User logged in successfully",
                });
            }

            return next(new ErrorResponse("One or more field is empty", 404));
        } catch (error) {
            next(error);
        }
    },

    googleLogin: async (req, res, next) => {
        try {
            const { tokenId } = req.body;

            if (!tokenId || typeof tokenId !== "string") {
                return next(new ErrorResponse("Invalid token", 400));
            }

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            const { email_verified, sub, given_name, family_name, picture, email } = payload;

            if (!email_verified) return next(new ErrorResponse("Email is not verified", 401));

            if (!sub) return next(new ErrorResponse("User is not found", 404));

            if (!given_name) return next(new ErrorResponse("First name is required", 400));

            if (!family_name) return next(new ErrorResponse("Last name is required", 400));

            const password = sub + process.env.GOOGLE_USER_SECRET;

            const userExists = await loginController.isUserExists({
                email,
                userName: email,
            });

            if (userExists) {
                const passwordMatched = await this.userDoc.matchPassword(password);

                if (!this.userDoc.status.active || !this.userDoc.status.isVerified) {
                    return next(new ErrorResponse("User account is not verifed or in-active", 403));
                }

                if (passwordMatched) {
                    return loginController.sendResponse(req, res, "User logged in successfully");
                } else {
                    return next(new ErrorResponse("Invalid credentials", 400));
                }
            }

            const userModal = User({
                userName: email,
                firstName: given_name,
                lastName: family_name,
                email: email,
                googleLogin: true,
                password: password,
                avatarRef: picture,
                status: {
                    active: true,
                    onHold: false,
                    restricted: false,
                    isVerified: true,
                },
            });

            this.userDoc = await userModal.save();

            loginController.sendResponse(req, res, "User account created successfully");

            let message = `You have logged in to Saas POS successfully`;

            sendMail({
                toEmail: email,
                subject: "Account creation successfull",
                message,
            });
        } catch (error) {
            next(error);
        }
    },

    sendResponse: (req, res, message) => {
        const expirationTime = 60 * 60 * 24 * 10 * 1000;

        if (this.userDoc?._id) {
            req.session.cookie.maxAge = expirationTime;

            req.session.userID = this.userDoc._id;

            return res.status(200).json({
                code: 200,
                status: "success",
                message,
            });
        }
    },

    isUserExists: async (loginArgs) => {
        const user = await User.findOne(loginArgs).select(["password", "status"]);

        if (user) {
            this.userDoc = user;
            return true;
        }

        return false;
    },
};

module.exports = loginController;
