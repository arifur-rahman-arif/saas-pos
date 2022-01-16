const User = require("../models/user/user");
const ErrorResponse = require("../utils/ErrorResponse");
const { OAuth2Client } = require("google-auth-library");
const sendMail = require("../utils/emails/sendMail");
const errorCodes = require("../middleware/errorCodes");

class Login {
    async login(req, res, next) {
        // Assign the parameter
        this.req = req;
        this.res = res;
        this.next = next;

        try {
            const { userName, email, password, keepMeLoggedIn } = this.req.body;

            if (!password) {
                return this.next(new ErrorResponse("Password is required", 400));
            }

            if (!userName && !email) {
                return this.next(new ErrorResponse("Username or email is required", 400));
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
                return this.next(new ErrorResponse("Username or email is required", 400));
            }

            this.userDoc = await User.findOne(data).select(["password", "status"]);

            if (!this.userDoc) return this.next(new ErrorResponse("User don't exists", 404));

            let isPasswordMatch = await this.userDoc.matchPassword(password);

            if (!isPasswordMatch) return this.next(new ErrorResponse("Invalid credentials", 401));

            if (!this.userDoc.status.active || !this.userDoc.status.isVerified) {
                return this.next(new ErrorResponse("User account is not verifed or in-active", 403));
            }

            if (this.userDoc?._id) {
                if (keepMeLoggedIn) {
                    return this.sendResponse("User logged in successfully");
                }

                this.req.session.userID = this.userDoc._id;

                return this.res.status(200).json({
                    code: errorCodes[200],
                    status: "success",
                    message: "User logged in successfully",
                });
            }

            return this.next(new ErrorResponse("One or more field is empty", 404));
        } catch (error) {
            this.next(error);
        }
    }

    async googleLogin(req, res, next) {
        // Assign the parameter
        this.req = req;
        this.res = res;
        this.next = next;

        try {
            const { tokenId } = this.req.body;

            if (!tokenId || typeof tokenId !== "string") {
                return this.next(new ErrorResponse("Invalid token", 400));
            }

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            const { email_verified, sub, given_name, family_name, picture, email } = payload;

            if (!email_verified) return this.next(new ErrorResponse("Email is not verified", 401));

            if (!sub) return this.next(new ErrorResponse("User is not found", 404));

            if (!given_name) return this.next(new ErrorResponse("First name is required", 400));

            if (!family_name) return this.next(new ErrorResponse("Last name is required", 400));

            const password = sub + email;

            const userExists = await this.isUserExists({
                email,
            });

            if (userExists) {
                const passwordMatched = await this.userDoc.matchPassword(password);

                if (!this.userDoc.status.active || !this.userDoc.status.isVerified) {
                    return this.next(new ErrorResponse("User account is not verifed or in-active", 403));
                }

                if (passwordMatched) {
                    return this.sendResponse("User logged in successfully");
                } else {
                    return this.next(new ErrorResponse("Invalid credentials", 400));
                }
            }

            const userModal = User({
                userName: email,
                firstName: given_name,
                lastName: family_name,
                email: email,
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

            this.sendResponse("User account created successfully");

            let message = `User account created successfully`;

            sendMail({
                toEmail: email,
                subject: "Account creation successfull",
                message,
            });
        } catch (error) {
            this.next(error);
        }
    }

    async facebookLogin(req, res, next) {
        // Assign the parameter
        this.req = req;
        this.res = res;
        this.next = next;

        try {
            const { accessToken, email, userID, name, picture } = this.req.body;

            if (!accessToken || typeof accessToken !== "string") {
                return this.next(new ErrorResponse("Invalid token", 400));
            }

            if (
                !email ||
                typeof email !== "string" ||
                !userID ||
                typeof userID !== "string" ||
                !name ||
                typeof name !== "string" ||
                !picture ||
                typeof picture !== "object"
            ) {
                return this.next(new ErrorResponse("Missing required field", 400));
            }

            // Get the first name and last name from the name variable
            const [firstName, lastName] = name.split(" ");

            if (!firstName) {
                firstName = email;
            }

            const avatarRef = picture?.data?.url;

            const password = userID + email;

            const userExists = await this.isUserExists({
                email,
            });

            if (userExists) {
                const passwordMatched = await this.userDoc.matchPassword(password);

                if (!this.userDoc.status.active || !this.userDoc.status.isVerified) {
                    return this.next(new ErrorResponse("User account is not verifed or in-active", 403));
                }

                if (passwordMatched) {
                    return this.sendResponse("User logged in successfully");
                } else {
                    return this.next(new ErrorResponse("Invalid credentials", 400));
                }
            }

            const userModal = User({
                userName: email,
                firstName,
                lastName,
                email: email,
                password: password,
                avatarRef,
                status: {
                    active: true,
                    onHold: false,
                    restricted: false,
                    isVerified: true,
                },
            });

            this.userDoc = await userModal.save();

            this.sendResponse("User account created successfully");

            let message = `User account created successfully`;

            sendMail({
                toEmail: email,
                subject: "Account creation successfull",
                message,
            });
        } catch (error) {
            this.next(error);
        }
    }

    sendResponse(message) {
        const expirationTime = 60 * 60 * 24 * 10 * 1000;

        if (this.userDoc?._id) {
            this.req.session.cookie.maxAge = expirationTime;

            this.req.session.userID = this.userDoc._id;

            return this.res.status(200).json({
                code: errorCodes[200],
                status: "success",
                message,
            });
        }
    }

    async isUserExists(loginArgs) {
        const user = await User.findOne(loginArgs).select(["password", "status"]);

        if (user) {
            this.userDoc = user;
            return true;
        }

        return false;
    }
}

const loginController = new Login();

module.exports = loginController;
