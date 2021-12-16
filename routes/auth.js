const express = require("express");
const router = express.Router();
const path = require("path");
const registerController = require("../controllers/register");
const authMiddleware = require("../middleware/auth");
const verifyUserController = require("../controllers/verifyUser");
const loginController = require("../controllers/login");
const logoutUserController = require("../controllers/logoutUser");
const forgotPasswordController = require("../controllers/forgotPassword");

const route = path.parse(path.basename(__filename)).name;

router.post(`/${route}/login`, loginController.login);

router.post(`/${route}/register`, authMiddleware.isUserExists, registerController.register);

router.get(`/${route}/register/:authToken`, verifyUserController.verifyUser);

router.post(`/${route}/verify-request`, authMiddleware.verifyReqToken);

router.post(`/${route}/logout-user`, authMiddleware.hasCapabitlities, logoutUserController.logout);

router.post(`/${route}/forgot-password`, forgotPasswordController.sendToken);

// router.patch(`/${route}/reset-password`, async (req, res) => {
//     res.status(200).send({
//         status: 200,
//         message: `Response from /api/${route}`,
//     });
// });

module.exports = router;
