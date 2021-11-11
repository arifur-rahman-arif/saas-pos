const express = require("express");
const router = express.Router();
const path = require("path");
const route = path.parse(path.basename(__filename)).name;

router.get(`/${route}`, (req, res) => {
    console.trace(`Request for /api/${route}`);
    res.status(200).send("Hello from post!");
});

module.exports = router;
