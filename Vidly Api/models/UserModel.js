const mongoose = require("mongoose");

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

//creating a model
const User = mongoose.model("User", UserSchema);

//exporting the User model
module.exports.User = User;
