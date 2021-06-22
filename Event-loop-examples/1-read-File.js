const { readFile } = require("fs");

console.log("Started a first task");

readFile("../content/second.txt", "utf-8", (error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(result);
  console.log("completed first task");
});

console.log("onto the next task");
