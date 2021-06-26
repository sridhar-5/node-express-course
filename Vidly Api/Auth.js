function auth(request, response, next) {
  console.log("Authunticating....");
  //this passes the control to the next middle ware function in the request processing pipeline
  next();
}

module.exports = auth;
