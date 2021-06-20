//importing http module

const http = require("http");

//Create server method is taking in a call back as aparameter
//that call back expects another two parameters req, res both are objects

// request - this parameter represents the incoming requests like this has all the information
//required to full-fill a request. ex: Method, etc

// response - in this object we have what we are sending back to the client

const server = http.createServer((request, response) => {
  //this is the text that is returned whena request is made to
  //the server => res.write() method

  //to dynamically change the response when a client is requesting a different
  //webpage we should use the req parameters as well

  if (request.url === "/") {
    response.end("Hello this is our home page");
  } else if (request.url === "/about") {
    response.end("Here is the short history");
  } else {
    response.end(`<h1 style="text-align:center;">404: Page not found</h1>`);
  }
});

// before setting up a server we have to look into what port a server
// is listening to so ..
server.listen(5000);
// now server will start to listen on 5000 port
