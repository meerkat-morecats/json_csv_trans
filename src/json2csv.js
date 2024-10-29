const fs = require("fs");
const path = require("path");

function json2csv(fileName) {
    const filePath = path.join(__dirname, "../json", `${fileName}.json`);
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const obj = JSON.parse(data);
    const columns = Object.keys(obj[Object.keys(obj)[0]]);

    const result = Object.entries(obj).reduce(
        (acc, [key, value]) => {
            return [...acc, [key, ...Object.values(value)].join(",")];
        },
        [columns.join(",")]
    );

    fs.writeFileSync(
        path.join(__dirname, "../csv", `${fileName}.csv`),
        result.join("\n")
    );
}

module.exports = json2csv;
