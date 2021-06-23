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
app.get("/", () => {});

app.listen(5000, () => {
  console.log("server listening on 5000");
});
