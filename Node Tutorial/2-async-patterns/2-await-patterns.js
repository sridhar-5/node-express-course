const { readFile, writeFile } = require("fs").promises;

const utils = require("util");

// utils library promisify method returns a promise without even writing a p[romise

// const readFilePromise = utils.promisify(readFile);
// const writeFilePromise = utils.promisify(writeFile);

const start = async () => {
  try {
    const first = await readFile("../content/second.txt", "utf8");
    const second = await readFile("../content/text.txt", "utf8");
    await writeFile(
      "../content/result-mind-grenade.txt",
      `This is an awesome evening : ${first} ${second}`,
      { flag: "a" }
    );
    console.log(first);
  } catch (e) {
    console.log(e);
  }
};

start();

// this method is call back hell
// readFile('../content/second.txt', 'utf8', (error, data) => {
//     if (error) {
//         return;
//     }
//     else {
//         console.log(data);

//     }
// })

///this is rewriting the same code using promises;

// const getText = (path) => {
//   return new Promise((reject, resolve) => {
//     readFile(path, "utf8", (error, result) => {
//       if (error) {
//         console.log(error);
//         reject(error);
//       } else {
//         console.log("hmm  yeah");
//         resolve(result);
//       }
//     });
//   });
// };

// getText("../content/second.txt")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
