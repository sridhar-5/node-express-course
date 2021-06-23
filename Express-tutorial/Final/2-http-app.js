const http = require("http");
const { readFileSync } = require("fs");

const homePage = readFileSync("./nav-bar-app/index.html");
const homeStyles = readFileSync("./nav-bar-app/styles.css");
const homeLogo = readFileSync("./nav-bar-app/logo.svg");
const homeLogic = readFileSync("./nav-bar-app/browser-app.js");

const server = http.createServer((request, response) => {
  const url = request.url;

  //rendering home page
  if (url === "/") {
    response.writeHead(200, { "content-type": "text/html" });
    response.write(homePage);
    response.end();
  }
  // response with styles
  else if (url === "/styles.css") {
    response.writeHead(200, { "content-type": "text/css" });
    response.write(homeStyles);
    response.end();
  }
  //response with logo
  else if (url === "/logo.svg") {
    response.writeHead(200, { "content-type": "image/svg+xml" });
    response.write(homeLogo);
    response.end();
  } else if (url === "/browser-app.js") {
    response.writeHead(200, { "content-type": "text/javascript" });
    response.write(homeLogic);
    response.end();
  }
});

server.listen(4000);
