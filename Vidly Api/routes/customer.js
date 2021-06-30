const Express = require("express");
const mongoose = require("mongoose");
const router = Express.Router();
const Joi = require("joi");

//defining Schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  isGold: { type: Boolean, default: false },
  phone: { type: Number, minlength: 10, maxlength: 10 },
});

const Customer = mongoose.model("customer", customerSchema);

router.get("/", async (request, response) => {
  //send all the customers
  const customersData = await Customer.find().sort({ name: 1 });
  response.send(customersData);
});

router.post("/", async (request, response) => {
  const joischema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.number().required(),
  });
  const { error } = joischema.validate(request.body);

  if (error) {
    return response.status(400).render("customerBadRequest", {
      message: "400: Sorry! This is a Bad request",
    });
  }
  const customers = new Customer({
    name: request.body.name,
    phone: request.body.phone,
  });
  //saving to the database
  const result = await customers.save();
  console.log(result);
  response.send(result);
});

router.put("/:CustomerId", async (request, response) => {
  const joischema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.number().required(),
  });

  const { error } = joischema.validate(request.body);

  if (error) {
    return response.status(400).render("customerBadRequest", {
      message: "400: Sorry! This is a Bad request",
    });
  }
  //check for the id if it is in database
  const check = Customer.find({ _id: request.params.CustomerId });
  if (!check) return response.status(400).send("Id Not found");
  const update = await Customer.findByIdAndUpdate(request.params.CustomerId, {
    $set: {
      name: request.body.name,
      isGold: request.body.isGold,
      phone: request.body.phone,
    },
  });
  console.log(update);
  response.send(update);
});

module.exports = router;
