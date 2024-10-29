const fs = require("fs");
const path = require("path");

module.exports = function csv2json(fileName) {
    const filePath = path.join(__dirname, "../csv", `${fileName}.csv`);
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const lines = data.split("\n");
    const obj = {};
    const nameRow = lines.shift().split(",");

    for (const row of lines) {
        const rowData = row.split(",");
        const mainKey = rowData.shift();

        obj[mainKey] = {};
        for (let i = 0; i < rowData.length; i++) {
            const element = rowData[i];
            obj[mainKey][nameRow[i + 1]] = element;
        }
    }

    const outputPath = path.join(__dirname, "../json", `${fileName}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(obj, null, 2));
};
