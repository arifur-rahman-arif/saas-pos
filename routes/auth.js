const express = require("express");
const router = express.Router();
const path = require("path");
const chalk = require("chalk");
const registerController = require("../controllers/register");
const authMiddleware = require("../middleware/auth");
const verifyUserController = require("../controllers/verifyUser");
const loginController = require("../controllers/login");
const db = require("../config/dbConnection");
const logoutUserController = require("../controllers/logoutUser");

const route = path.parse(path.basename(__filename)).name;

router.post(`/${route}/login`, loginController.login);

router.post(`/${route}/register`, authMiddleware.isUserExists, registerController.register);

router.get(`/${route}/register/:authToken`, verifyUserController.verifyUser);

router.post(`/${route}/verifyRequest`, authMiddleware.verifyReqToken);

router.post(`/${route}/logoutUser`, authMiddleware.hasCapabitlities, logoutUserController.logout);

router.get(`/${route}/forgot-password`, async (req, res) => {
    res.status(200).send({
        status: 200,
        message: `Response from ${req.originalUrl}`,
    });
});

// router.get(`/${route}/reset-password:resetToken`, async (req, res) => {
//     res.status(200).send({
//         status: 200,
//         message: `Response from /api/${route}`,
//     });
// });

module.exports = router;
