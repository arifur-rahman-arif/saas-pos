const User = require("../models/user/user");
const ErrorResponse = require("../utils/ErrorResponse");

const logoutUserController = {
    logout: async (req, res, next) => {
        try {
            const { userID } = req.body;

            if (!userID) {
                return next(new ErrorResponse("User ID is required to remove user session", 400));
            }
        } catch (error) {
            next(error);
        }
    },
};

module.exports = logoutUserController;
