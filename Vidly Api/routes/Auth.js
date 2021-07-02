const Express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = Express.Router();
const Joi = require("joi");
const { User } = require("../models/UserModel");
//importing json webtoken library
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async (request, response) => {
  const joischema = Joi.object({
    email: Joi.string().min(6).max(100).required(),
    password: Joi.string().min(8).max(100).required(),
  });

  const { error } = joischema.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  var user = await User.findOne({ email: request.body.email });
  if (!user) return response.status(400).send(`Invalid username or password`);

  var passwordValidate = bcrypt.compare(request.body.password, user.password);
  if (!passwordValidate)
    return response.status(400).send("Invalid username or password");

  const token = user.generateAuthToken();
  response.send(token);
});

module.exports = router;
