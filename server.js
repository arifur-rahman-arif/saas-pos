// Require all module dependencies
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const error = require("./middleware/error");

require("./config/dbConnection");

("use strict");

let processArgs = process.argv.slice(2);

global.environment = processArgs.includes("development") ? "development" : "production";

// Define the app server environment
app.set("env", environment);

// Use all the middlewares here
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: environment === "development" ? false : true },
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    })
);

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

// Handle errors for all rounte
app.use(error.errorHandler);

// Run the app on the server port
const server = app.listen(PORT, () => {
    if (environment === "development") {
        console.log(`Server running at http://localhost:${PORT}/api/`);
    } else {
        console.log(`Server running at ${PORT}`);
    }
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});
