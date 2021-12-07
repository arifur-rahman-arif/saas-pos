const User = require("../models/user/user");
const ErrorResponse = require("../utils/ErrorResponse");

const loginController = {
    login: async (req, res, next) => {
        const { userName, email, password } = req.body;

        if (!password) {
            return next(new ErrorResponse("Password is required", 404));
        }

        if (!userName && !email) {
            return next(new ErrorResponse("Username or email is required", 404));
        }

        let userDoc = await User.findOne({ $or: [{ email }, { userName }] });

        if (!userDoc) next(new ErrorResponse("User don't exists", 404));

        let token = userDoc.getSignedJwtToken("3d");

        if (token) {
            return res.status(200).json({
                code: 200,
                status: "success",
                token,
                response: "User logged in successfully",
            });
        }

        return next(new ErrorResponse("One or more field is empty", 404));
    },
};

module.exports = loginController;
