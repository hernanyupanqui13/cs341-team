console.log("ola!");

const fs = require("fs");

fs.writeFileSync("test.txt", "funcioan por fa");
fs.readFile("test.txt", "utf-8", (error, data) => {
    console.log(data);
});
