const fs = require("fs");
const csv = require("csv-parser");

const csvFilePath = "./latlon.csv";
const jsonFilePath = "./ColdStore.json";

const results = [];

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
        fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2), "utf-8");
        console.log("JSON file created: ColdStore.json");
    });
