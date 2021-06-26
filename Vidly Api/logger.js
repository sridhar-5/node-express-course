function log(request, response, next) {
  console.log("Logging....");
  //this passes the control to the next middle ware function in the request processing pipeline
  next();
}

module.exports = log;
