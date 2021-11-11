const chalk = require("chalk");
const prompts = require("prompts");
const fs = require("fs");
const path = require("path");

const createRoute = require("../utils/createRoute");

(async () => {
    const response = await prompts([
        {
            type: "text",
            name: "route-name",
            message: chalk.yellowBright.underline.italic.bold("Enter the route name:"),
            validate: (value) => {
                value = value.trim();
                if (value.match(/\s/g)) {
                    return "Blank space is not allowed. Try with (-) or camelCase word";
                }

                let routeFiles = fs.readdirSync("./routes");

                if (routeFiles) {
                    for (let i = 0; i < routeFiles.length; i++) {
                        const file = routeFiles[i];
                        if (path.parse(file).name === value) {
                            exit;
                            return "File already exits in route path. Try a different file name";
                        }
                    }
                }
                return true;
            },
        },
    ]);

    createRoute(response["route-name"]).then((error) => {
        if (error) throw error;
        console.log(
            chalk.yellowBright.italic.bold(
                `${response["route-name"]}.js created in ./routes folder as an API`
            )
        );
    });
})();
