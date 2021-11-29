const express = require("express");
const router = express.Router();
const path = require("path");
const chalk = require("chalk");
const User = require("../models/user/user");

const route = path.parse(path.basename(__filename)).name;

router.get(`/${route}`, async (req, res) => {
    console.log(chalk.yellowBright.italic.bold(`Request for /api/${route}`));

    // const user = User({
    //     userName: "AR Arifasdfa",
    //     fullName: "lasdfjl",
    //     email: "dev.ar.arif@gmail.com",
    //     password: "helaofsd",
    // });

    // User.find(function (err, data) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.status(200).send({
    //             status: 200,
    //             response: data,
    //         });
    //     }
    // });

    let data = await User.find().select(["fullName"]);

    res.status(200).send({
        status: 200,
        response: data,
    });

    // user.save((err) => {
    //     if (err) return console.trace(err);

    //     console.log("data inserted");
    // });

    // res.status(200).send({
    //     status: 200,
    //     response: `Response from /api/${route}`,
    // });
});

module.exports = router;
