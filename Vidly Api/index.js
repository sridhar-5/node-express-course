//class
const Express = require("express");
//creating the instance of express
const app = Express();

//joi class
const Joi = require("joi");
const albums = require("./routes/albums");
const homepage = require("./routes/homepage");
const logger = require("./logger");
const auth = require("./Auth");

app.use(Express.json());
app.use(logger);
app.use(auth);
app.use("/api/albums", albums);
app.use("/", homepage);
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

//listening on port 5000
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on the port ${port}...`);
});
