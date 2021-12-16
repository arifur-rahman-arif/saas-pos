const tokenController = {
    token: (req, res, next) => {
        try {
            return res.status(201).json({
                code: 200,
                status: "success",
                message: "Token verified successfully",
            });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = tokenController;
