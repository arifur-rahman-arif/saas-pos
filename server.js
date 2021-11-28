// Require all module dependencies
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const error = require("./middleware/error");

require("./config/dbConnection");

("use strict");
// Use all the middlewares here
app.use(express.json());
app.use(cors());

// Require all routes files here. these are going to be use as an /api route for this application
let routes = fs.readdirSync("./routes");
if (routes.length) {
    routes.forEach((api, i, arr) => {
        if (path.parse(api).ext === ".js") {
            app.use("/api", require(`./routes/${api}`));
        }
    });
} else {
    console.trace("No api file found.");
}

// IF there is no route specified than return error response
app.use(error.routeError);

// Run the app on the server port
app.listen(PORT, () => {
    let processArgs = process.argv.slice(2);

    if (processArgs.includes("development")) {
        console.log(`Server running at http://localhost:${PORT}/api/`);
    } else {
        console.log(`Server running at ${PORT}`);
    }
});
