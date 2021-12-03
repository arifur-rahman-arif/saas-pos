const chalk = require("chalk");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", (err) => {
    console.log(chalk.yellowBright.italic.bold(err.message));
    process.exit(1);
});
db.once("open", () => {
    console.log(chalk.yellowBright.italic.bold(`Database connected`));
});
