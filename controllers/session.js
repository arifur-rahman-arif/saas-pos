class Session {
    session(req, res, next) {
        try {
            res.cookie("userID", req.userID, {
                // httpOnly: true,
                sameSite: true,
                secure: true,
            });

            return res.status(200).json({
                code: 200,
                status: "success",
                message: "Session verified successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}

const sessionController = new Session();

module.exports = sessionController;
