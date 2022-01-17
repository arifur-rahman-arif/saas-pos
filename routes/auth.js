const express = require("express");
const router = express.Router();
const path = require("path");

const loginController = require("../controllers/login");
const registerController = require("../controllers/register");
const authMiddleware = require("../middleware/auth");
const verifyUserController = require("../controllers/verifyUser");
const forgotPasswordController = require("../controllers/forgotPassword");
const sessionController = require("../controllers/session");
const tokenController = require("../controllers/token");

const route = path.parse(path.basename(__filename)).name;

router.post(`/${route}/login`, loginController.login.bind(this));

router.post(`/${route}/google-login`, loginController.googleLogin.bind(this));

router.post(`/${route}/facebook-login`, loginController.facebookLogin.bind(this));

router.post(`/${route}/register`, authMiddleware.isUserExists, registerController.register.bind(this));

router.get(`/${route}/register/:authToken`, verifyUserController.verifyUser.bind(this));

router.post(`/${route}/verify-session`, authMiddleware.verifySession, sessionController.session.bind(this));

router.post(`/${route}/verify-token`, authMiddleware.verifyToken, tokenController.token.bind(this));

router.post(`/${route}/forgot-password`, forgotPasswordController.sendToken.bind(this));

// router.post(`/${route}/logout`, authMiddleware.hasCapabitlities, logoutUserController.logout);
// router.post(`/${route}/logout-user`, authMiddleware.hasCapabitlities, logoutUserController.logout);

router.post(`/${route}/reset-password`, async (req, res) => {
    console.log(req.body);
    res.status(200).send({
        status: 200,
        message: `Response from /api/${route} <h1>hello</h1>`,
    });
});

module.exports = router;
