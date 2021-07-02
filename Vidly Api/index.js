//class
const Express = require("express");
//importing jsonwebtoken library

const jwt = require("jsonwebtoken");
//addign persistence
const mongoose = require("mongoose");
const config = require("config");
//creating the instance of express
const app = Express();

if (!config.get("jwtPrivateKey")) {
  console.error("Fatal error: private key not found");
  process.exit(1);
}

//joi class
const Joi = require("joi");
const albums = require("./routes/albums");
const homepage = require("./routes/homepage");
const customers = require("./routes/customer");
const Users = require("./routes/RegisterUser");
const loginAuth = require("./routes/Auth");

app.use(Express.json());
app.use("/api/albums", albums);
app.use("/", homepage);
app.use("/api/customers", customers);
app.use("/api/users", Users);
app.use("/api/login", loginAuth);
//vidly data

app.set("view engine", "pug");
app.set("views", "./views");

//middle ware = > a middleware function is a function that sends the response to the client or
//sends the controls to the next middle ware function using the request object

// app.use((request, response, next) => {
//   console.log("Logging....");
//   //this passes the control to the next middle ware function in the request processing pipeline
//   next();
// })

// app.use((request, response, next) => {
//   console.log("Authunticating....");
//   //this passes the control to the next middle ware function in the request processing pipeline
//   next();
// });
//middle ware functions are always called in sequence

//now home page

//establishing connection to data base
const connection = mongoose.connect("mongodb://localhost:27017/vidly", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

//handling the connection
connection.then(() => {
  console.log("conenction established..");
});
connection.catch((error) => {
  console.log("conection rejected...", error.message);
});

//listening on port 5000
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on the port ${port}...`);
});
