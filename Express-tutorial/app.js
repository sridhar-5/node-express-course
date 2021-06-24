const express = require("express");
const { products } = require("./data");
const app = express();

//middle ware turorial

// req => middleware => response

app.listen(5000, () => {
  console.log("Listening to port 5000");
});
