const express = require("express");
const router = express.Router();
const path = require("path");
const registerController = require("../controllers/register");
const authMiddleware = require("../middleware/auth");
const verifyUserController = require("../controllers/verifyUser");
const loginController = require("../controllers/login");
const forgotPasswordController = require("../controllers/forgotPassword");
const sessionController = require("../controllers/session");
const tokenController = require("../controllers/token");

const route = path.parse(path.basename(__filename)).name;

router.get(`/${route}/register/:authToken`, verifyUserController.verifyUser);

router.post(`/${route}/login`, loginController.login);
router.post(`/${route}/register`, authMiddleware.isUserExists, registerController.register);
router.post(`/${route}/verify-session`, authMiddleware.verifySession, sessionController.session);
router.post(`/${route}/verify-token`, authMiddleware.verifyToken, tokenController.token);
router.post(`/${route}/forgot-password`, forgotPasswordController.sendToken);
router.post(`/${route}/google-login`, loginController.googleLogin);
router.post(`/${route}/facebook-login`, loginController.facebookLogin);

// router.post(`/${route}/logout`, authMiddleware.hasCapabitlities, logoutUserController.logout);
// router.post(`/${route}/logout-user`, authMiddleware.hasCapabitlities, logoutUserController.logout);

// router.patch(`/${route}/reset-password`, async (req, res) => {
//     res.status(200).send({
//         status: 200,
//         message: `Response from /api/${route}`,
//     });
// });

module.exports = router;
