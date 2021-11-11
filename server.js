// Require all module dependencies
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Use all the middlewares here
app.use(express.json());
app.use(cors());

// Require all routes files here. these are going to be use as an /api route for this application
fs.readdir("./routes", (err, routes) => {
    if (err) return console.trace(err);

    if (!routes) return console.trace("No api file found.");

    routes.forEach((api) => {
        if (path.parse(api).ext === ".js") {
            app.use("/api", require(`./routes/${api}`));
        }
    });
});

// Run the app on the server port
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
