const express = require("express");
const router = express.Router();
const path = require("path");
const chalk = require("chalk");

const route = path.parse(path.basename(__filename)).name;

router.get(`/${route}`, (req, res) => {
    console.log(chalk.yellowBright.italic.bold(`Request for /api/${route}`));
    res.status(201).send({
        status: 200,
        response: `Response from /api/${route}`,
    });
});

module.exports = router;
