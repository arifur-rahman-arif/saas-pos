const Session = require("../models/user/session");
const User = require("../models/user/user");
const ErrorResponse = require("../utils/ErrorResponse");

const logoutUserController = {
    logout: async (req, res, next) => {
        try {
            const { userID } = req.body;

            if (!userID) {
                return next(new ErrorResponse("User ID is required to remove user session", 400));
            }

            let isDeleted = await Session.deleteMany({
                userID,
            });

            if (parseInt(isDeleted.deletedCount) > 0) {
                return res.status(200).json({
                    code: 200,
                    status: "success",
                    response: "User session removed successfully",
                });
            } else {
                return next(new ErrorResponse("No user session found to delete", 404));
            }
        } catch (error) {
            next(error);
        }
    },
};

module.exports = logoutUserController;
