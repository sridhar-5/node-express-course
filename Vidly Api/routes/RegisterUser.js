const Express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = Express.Router();
const Joi = require("joi");
const { User } = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const AuthUser = require("../middleware/Authunticate");

//new end point for the personal profile kind
router.get("/me", AuthUser, async (request, response) => {
  const user = await User.findById(request.user._id).select("-password");
  response.send(user);
});

router.post("/", async (request, response) => {
  const joischema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(6).max(100),
    password: Joi.string().min(8).max(100),
  });

  const { error } = joischema.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  var user = await User.findOne({ email: request.body.email });
  if (user)
    return response.status(400).send(`User Already Exist. Please try to login`);

  user = new User({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
  });
  //storing the password as a normal text in the database is funny and not safe
  //conecpt behind this kind of salted hashing is if you simpley hash and store your password in the database
  // ex 1234 => abcd here assume 1234 has abcd as its hash so hackers can compile some popular hashes and compare and get to know
  // that abcd is 1234 so the idea of this salt is like we add the salt before ot after the string so that it is different every time
  // depends on the salt we use.

  //gensalt returns a promise and the parameter is the no of rounds we are salting
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  await user.save();

  //here we are sending the user all the information including the password which is unecessary
  //one way of doing this is
  // response.send({
  //   user.name,
  //   user.email
  // })
  //this is not an efficient way of soing this instead we can use the lodash module

  //code for generatign the token is being repeated in auth and register user
  const token = user.generateAuthToken();
  response.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
  // response.send(user);
});

module.exports = router;
