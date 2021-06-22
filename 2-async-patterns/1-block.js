const http = require("http");

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.end("you arer on the home page");
  }
  if (request.url === "/about") {
    //blocking code which takes quite some time
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        console.log(`${i} ${j}`);
      }
    }
    response.end("Welcome about");
  }
});

server.listen(5000, () => {
  console.log("server listening on port 5000");
});
