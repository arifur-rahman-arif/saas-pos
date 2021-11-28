const chalk = require("chalk");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log(chalk.yellowBright.italic.bold(`Database connected: ${process.env.MONGODB_URL}`));
});
