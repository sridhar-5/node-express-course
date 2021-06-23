const express = require("express");
const path = require("path");

const app = express();

// app.get("/", (request, response) => {
//   response.sendFile(path.resolve(__dirname, "./nav-bar-app/index.html"));
// });

app.use(express.static("./public"));

app.all("*", (request, response) => {
  response.status(404).send("Resource not found");
});

app.listen(5000, () => {
  console.log("server listening on 5000");
});
