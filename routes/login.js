const express = require("express");
const router = express.Router();
const path = require("path");
const chalk = require("chalk");
const { Transient, transientSchema } = require("../models/transient");

const route = path.parse(path.basename(__filename)).name;

router.get(`/${route}`, async (req, res) => {
    console.log(chalk.yellowBright.italic.bold(`Request for /api/${route}`));

    try {
        const transient = new Transient({
            name: "testing",
            value: [1, 2],
        });

        transientSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

        let data = await transient.save();

        console.log(data);
        console.log("transiednt saved");
    } catch (error) {
        console.log(error);

        return res.status(200).send({
            status: 500,
            response: error.message,
        });
    }

    res.status(200).send({
        status: 200,
        response: `Response from /api/${route}`,
    });
});

module.exports = router;
