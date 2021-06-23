// console.log("Express tutorial start");

const http = require("http");

//creatign a server here
const server = http.createServer((request, response) => {
  const url = request.url;

  if (url === "/") {
    response.writeHead(200, { "content-type": "text/html" });
    response.write("<h1>Home Page</h1>");
    response.end();
  } else if (url === "/about") {
    response.writeHead(200, { "content-type": "text/html" });
    response.write("<h1>About Page</h1>");
    response.end();
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.write('<h1 style="text-align:center;">Page not found</h1>');
    response.end();
  }
});

server.listen(5000);
