const ErrorResponse = require("../bin/utils/ErrorResponse");
const User = require("../models/user/user");

const registerController = {
    user: null,

    register: async (req, res, next) => {
        try {
            registerController.user = User(req.body);

            registerController.user.save(function (err, result) {
                if (err) {
                    return next(new ErrorResponse(err, 400));
                } else {
                    registerController.sendToken(req, res, next);
                }
            });
        } catch (error) {
            next(error);
        }
    },

    sendToken: (req, res, next) => {
        if (!registerController.user) return next(new ErrorResponse("User don't exists", 404));
        const token = registerController.user.getSignedJwtToken();

        res.status(201).json({
            code: 201,
            status: "success",
            token,
            response: "User created successfully",
        });
    },
};

module.exports = registerController;
