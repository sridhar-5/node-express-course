//including or importing http module
const http = require("http");

const server = http.createServer((request, response) => {
  console.log("request made");
  response.end("Hello");
});

//.listen method to start listening on a particular port.
server.listen(5000, () => {
  console.log("server listening on port : 5000");
});
