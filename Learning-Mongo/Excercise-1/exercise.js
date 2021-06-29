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

async function queryExercise() {
  const queryResult = await Exercise.find({
    isPublished: true,
    tags: "backend",
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  console.log(queryResult);
}

queryExercise();
