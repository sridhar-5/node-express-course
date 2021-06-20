// the main difference between the async and sync methods in
// file system module is we should provide a call back as the parameter
//to the readFile and writeFile methods and the call back will only run
// after the functionality

const { readFile, writeFile } = require("fs");

readFile("./content/second.txt", "utf8", (error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const first = result;
  readFile("./content/text.txt", "utf8", (error, result) => {
    if (error) {
      console.log(error);
    }
    const second = result;
    writeFile(
      "./content/result-async.txt",
      `Here is the result: ${first}, ${second}`,
      (error, result) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log("done writing");
      }
    );
  });
});

console.log("execution of this file finish");

//the main reason on why we use async functions here is that
// only after the read from both the files we can write the content
// of them into a new file
