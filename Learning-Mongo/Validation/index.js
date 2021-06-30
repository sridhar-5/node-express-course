//this part is to understand validations concepts in mongo db

const mongoose = require("mongoose");

//establishing connection
const connection = mongoose.connect(
  "mongodb://localhost:27017/mongo-excercises",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//handling the connection
connection.then(() => {
  console.log("Connection established...");
});
connection.catch((error) => {
  console.log("Connection rejected....", error);
});

//connection part finished
// defining schema
// const excerciseSchema = new mongoose.Schema({
//constraint : course cannot exist without name so this is a required field
//if the type is a string we canalso have minlength and maxlength properties and match to match the regular expression
// name: { type: String, required: true, minlength: 5, maxlength: 200 },
// tags: {
//   type: Array,
//   validate: {
//     validator: function (array) {
//like if we are supposed to have atleast one tag
//       return array.length > 0;
//     },
//     message: "a course should have atleast one tag.",
//   },
// },
// date: { type: Date, default: Date.now },
// author: { type: String, required: true },
// isPublished: Boolean,
// if an attribute is bound to an other attribute. example to this is if price is only required when isPublished is true (only if the course is
//published it has a price to make this )
// price: {
//for numbers we have min and max property
// type: Number,
// required: function () {
//   return this.isPublished;
// },
//arrow function cannot be used here because if there is a function in mongoose that is callling this function
//arrow function's this will refer to that function

//     min: 5,
//     max: 200,
//   },
// });

const excerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 200 },
  tags: {
    type: Array,
    isAsync: true,
    validate: {
      validator: function (array, callback) {
        setTimeout(() => {
          const result = array && array.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have atleast one tag",
    },
  },
});

//init the schema into a class
const Practice = mongoose.model("Course", excerciseSchema);

//use this model to create documents

const creatingCourses = async () => {
  const course = new Practice({
    name: "Mern stack",
    tags: [],
    author: "Mosh",
    isPublished: true,
    price: 11,
  });
  try {
    const write = await course.save();
    console.log(write);
  } catch (error) {
    console.log(error.message);
  }
};

creatingCourses();
