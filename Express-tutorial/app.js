const express = require("express");
const { products } = require("./data");

const logger = require("./logger");
const authorize = require("./authorize");
const app = express();

//middle ware tutorial

// req => middleware => response

//middle ware function

// app.get("/", logger, (req, res) => {
//   res.send("Home");
// });

// app.get("/about", logger, (req, res) => {
//   res.send("About");
// });
//this is one way of doing this the other way
// around is using the.use method

app.use("/api", logger, authorize);

//notes on app use

// while creating an .use statement order definitely matters
// like if the .use is at the top of the code it is being done for all
// the get methods below it

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("products");
});

app.get("/api/items", (req, res) => {
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Listening to port 5000");
});
