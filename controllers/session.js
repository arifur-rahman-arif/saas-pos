const sessionController = {
    session: (req, res, next) => {
        try {
            return res.status(201).json({
                code: 200,
                status: "success",
                message: "Session verified successfully",
            });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = sessionController;
