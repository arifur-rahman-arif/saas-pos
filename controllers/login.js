const User = require("../models/user/user");
const ErrorResponse = require("../utils/ErrorResponse");

const loginController = {
    login: async (req, res, next) => {
        try {
            const { userName, email, password } = req.body;

            if (!password) {
                return next(new ErrorResponse("Password is required", 404));
            }

            if (!userName && !email) {
                return next(new ErrorResponse("Username or email is required", 404));
            }

            let data;

            if (userName.length > 0) {
                data = {
                    userName,
                };
            } else if (email.length > 0) {
                data = {
                    email,
                };
            } else {
                return next(new ErrorResponse("Username or email is required", 404));
            }

            const userDoc = await User.findOne(data).select(["password"]);

            if (!userDoc) next(new ErrorResponse("User don't exists", 404));

            let isPasswordMatch = await userDoc.matchPassword(password);

            if (!isPasswordMatch) return next(new ErrorResponse("Invalid credentials", 401));

            let token = userDoc.getSignedJwtToken("3d");

            if (token) {
                res.cookie("authToken", token, {
                    signed: true,
                    expires: new Date(Date.now() + 60 * 60 * 24 * 10 * 1000),
                });

                return res.status(200).json({
                    code: 200,
                    status: "success",
                    response: "User logged in successfully",
                });
            }

            return next(new ErrorResponse("One or more field is empty", 404));
        } catch (error) {
            next(error);
        }
    },
};

module.exports = loginController;
