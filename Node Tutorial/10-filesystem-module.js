//fs - file system module
const { readFileSync, writeFileSync } = require("fs");

//with teadSync we can read the files in a given path and the second parameter is
// the encoding of the file whcih is usually utf-8
const first = readFileSync("./content/text.txt", "utf-8");
const second = readFileSync("./content/second.txt", "utf-8");

//with write file sync we can write content to a particular file
//mentioned in the paht if the file mentioned in the path doesnt exist
// then node will create the file for us and then write the content

writeFileSync(
  "./content/result-sync.txt", // in this case a new file named 'result-sync'
  `Here is the result: ${first} , ${second}`,
  { flag: "a" } // which will be created
);

// and the second parameter in the file writeSync is the mode os operation
// can be just write which overwrites the content in the file or
// can be just append with which appends the content into a new file
