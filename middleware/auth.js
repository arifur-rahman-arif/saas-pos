const User = require("../models/user/user");
const ErrorResponse = require("../utils/ErrorResponse");

const authMiddleware = {
    isUserExists: async (req, res, next) => {
        const { userName, email } = req.body;

        const user = await User.find({
            userName,
            email,
        });

        if (user.length) return next(new ErrorResponse("Username or email already exits", 400));

        next();
    },
};

module.exports = authMiddleware;
