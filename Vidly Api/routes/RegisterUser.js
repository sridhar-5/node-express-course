const Express = require("express");
const mongoose = require("mongoose");
const router = Express.Router();
const Joi = require("joi");
const { User } = require("../models/UserModel");

router.post("/", async (request, response) => {
  console.log(User);
  const joischema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(6).max(100),
    password: Joi.string().min(8).max(100),
  });

  const { error } = joischema.validate(request.body);
  if (error)
    return response
      .status(400)
      .send(`<h1 style="text-align: center">This is a bad request.</h1>`);

  var user = await User.findOne({ email: request.body.email });
  if (user)
    return response.status(400).send(`User Already Exist. Please try to login`);
  user = new User({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
  });

  const saving_the_user = await user.save();
  response.send(user);
});

module.exports = router;
