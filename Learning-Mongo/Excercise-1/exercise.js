//import mongoose library

const mongoose = require("mongoose");

//console.log(typeof mongoose);   object

//open a connection to the database
//connectionStatus contains an promise that is returned by the mongoose connect
const connectionStatus = mongoose.connect(
  "mongodb://localhost:27017/mongo-exercises",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//promise handled with then and catch

connectionStatus.then(() => {
  console.log("Connection established...");
});

connectionStatus.catch((error) => {
  console.error("connection rejected.....", error);
});

//creating a schema
const ExerciseSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  date: { type: Date },
  author: String,
  isPublished: Boolean,
  price: Number,
});

//after the schema then create a model

const Exercise = mongoose.model("Course", ExerciseSchema);

//Exercise -1
//getting all the published backend courses and sorting them by name and dsiplaying the name and their authors
// async function queryExercise() {
//   const queryResult = await Exercise.find({
//     isPublished: true,
//     tags: "backend",
//   })
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 });

//   console.log(queryResult);
// }

// queryExercise();

//Exercise-2

//gwtting all the published front end and backend coursesand sort them in descendin order according to the price
//and selecting only name and the author and siaplying them

// const Exercise2 = async () => {
//   const queryResult = await Exercise.find({
//     isPublished: true,
//     tags: { $in: ["frontend", "backend"] },
//   })
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1 });

//   console.log(queryResult);
// };

// Exercise2();

//Exercise -3

//getting all the published courses that are more than 15 dollars or have the word'by' in rheir title

const Exercise3 = async () => {
  const queryResult = await Exercise.find({
    isPublished: true,
  }).or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]);
  console.log(queryResult);
};

Exercise3();
