class Token {
    token(req, res, next) {
        try {
            return res.status(201).json({
                code: 200,
                status: "success",
                message: "Token verified successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}

const tokenController = new Token();

module.exports = tokenController;
