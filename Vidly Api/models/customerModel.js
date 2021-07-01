const mongoose = require("mongoose");

//defining Schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  isGold: { type: Boolean, default: false },
  phone: { type: Number, minlength: 10, maxlength: 10 },
});

const Customer = mongoose.model("customer", customerSchema);

module.exports.Customer = Customer;
