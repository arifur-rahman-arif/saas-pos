const fs = require("fs");

module.exports = async function createRoute(fileName) {
    let srcFile = "./bin/template/route.js";
    let destination = `./routes/${fileName}.js`;

    let response = await fs.copyFileSync(srcFile, destination);

    return response;
};
