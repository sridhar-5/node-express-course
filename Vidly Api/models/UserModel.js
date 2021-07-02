const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    minlength: 6,
    maxlength: 100,
    match: /.*com.*/i,
    required: true,
  },
  password: { type: String, minlength: 8, maxlength: 100, required: true },
});

//create a method for generating the jwt token
UserSchema.methods.generateAuthToken = function () {
  //in this application we assume that if the user is registered then there is no need of login
  //so we generate jwt token here
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

//creating a model
const User = mongoose.model("User", UserSchema);

//exporting the User model
module.exports.User = User;
