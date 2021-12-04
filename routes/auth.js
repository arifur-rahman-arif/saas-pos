const express = require("express");
const router = express.Router();
const path = require("path");
const chalk = require("chalk");
const registerController = require("../controllers/register");
const authMiddleware = require("../middleware/auth");
const verifyUserController = require("../controllers/verifyUser");

const route = path.parse(path.basename(__filename)).name;

router.get(`/${route}/login`, async (req, res) => {
    let url = req.protocol + "://" + req.get("host") + req.originalUrl;
    res.status(200).send({
        status: 200,
        message: `Response from /api/${url}`,
    });
});

router.post(`/${route}/register`, authMiddleware.isUserExists, registerController.register);

router.get(`/${route}/register/:authToken`, verifyUserController.verifyUser);

router.get(`/${route}/forgot-password`, async (req, res) => {
    res.status(200).send({
        status: 200,
        message: `Response from /api/${route}`,
    });
});

router.get(`/${route}/reset-password:resetToken`, async (req, res) => {
    res.status(200).send({
        status: 200,
        message: `Response from /api/${route}`,
    });
});

module.exports = router;
