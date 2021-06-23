const path = require("path/posix");

// this is a platform specific file seperator
// like in windows \\ is used to differ a directory and its sub
//directory now in linux it is /

console.log(path.sep);

//it will take in any no of arguments and gicves you the normalised [ath
//using the path seperator automatically

const NormalizeFilePath = path.join("/content", "/text.txt");

console.log(NormalizeFilePath);

//path.basename will basicallly return the last levl in the path
const baseName = path.basename(NormalizeFilePath);

console.log(baseName);

//path.absolute is to get the exact path of a particular file

const absolutePath = path.resolve(__dirname, "content", "text.txt");

console.log(absolute);

//hello world
