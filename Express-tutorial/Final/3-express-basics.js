//including the express module here

const express = require("express");

//this line of code here creates a server instance
const app = express();

// now there are quite some methods we can make use of
// from this object

// app.get
// app.post
// app.put
// app.delete
//app.all
//app.listen

//get request to access the home page first
app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/about", (request, response) => {
  response.send("about page");
});

app.all("*", (request, response) => {
  response.status(404).send("<h1>Resource not found</h1>");
});

app.listen(5000, () => {
  console.log("server listening on 5000");
});
