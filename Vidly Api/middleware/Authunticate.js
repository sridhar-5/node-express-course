const jwt = require("jsonwebtoken");
const config = require("config");

//middleware function to authorize the user

module.exports = function (request, response, next) {
  //check for the token in the header
  const token = request.header("x-auth-token");
  if (!token)
    return response.status(401).send("Token missing..Please try again.");

  //validate the token using jwt.verify method
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    //the thing that is decoded from the token is the payload
    request.user = decoded;
    next();
  } catch (error) {
    response.status(401).send("Invalid token. Try again.");
  }
  // if token is not valid use try catch block to handle that
};
