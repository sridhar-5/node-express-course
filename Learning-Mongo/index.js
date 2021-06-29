//firstthing to do is connect to mongoose

const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/playground", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(() => {
  console.log("Connected to Mongo....");
});
connect.catch((error) => {
  console.error("Connection failed due to...", error);
});

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

//this model object is to instantiate the schema basically

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "React course",
    author: "sridhar",
    tags: ["react", "Frontend", "libraries"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
};

//querying the database here
//we should have an async function because querying the database is taking a bit of time

//async function getCourses() {
//the course class that we defined by writing the model has some methods to query the db
//some of them are find limit select
//this find method returns a document query object which is kinda like a promise so we can use the ,then method here
//const courses = await Course.find({ isPublished: true })

//we can also use comparision operators to make our queries more generalised and more powerful
/*
      eq : (equal)
      ne - notequal
      gt : greater than
      gte : greater than equal
      lt : less than
      lte : less than equal
      in : specially for lists     --- visualise tags example
      nin : not in : special for lists 
    */

//.find({ tags: { $in: ["Frontend", "backend"] } })
//this should return both the documents because name : nodejs course has tag backend
//and then name : react course has a tag : Frontend so both of them are selected.
//.find({ price: { $gte: 10 } })
//if there is an attribute price in the document then this query might have fetched all the courses that have
//price greater than equal to 10
//     .limit(1)
//     .sort({ name: 1 })
//     .select({ name: 1, isPublished: 1, tags: 1 });
//   console.log(courses);
// }

//logic operators
//two in number :
// or
//and

// async function getCourses() {
//   const courses = await Course
//while using logical operators just set the find method without any filters
// in javascript contruct we use to store multiple values is array so here we are goping to deal with multiple values
//like the startement .or(....) means that either the values in the object 1 is true or the key value pair in the second object is true
//that document is selected. same goes with and.
// .find()
//.or([{name: 'mosh'},{isPublished:true}])
//     .and([])
//     .limit(10)
//     .sort({ name: 1 }).
//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// }
// getCourses();

//we also can use regualr expressions to match strings

//if we want to select particular attributes or propeerties we choose the .select method and if we want to just
//count the no of documents that are the result of the query oerformed then usign count will do

async function getCourse() {
  const courses = await Course.find({ author: "sridhar", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(courses);
}

getCourse();
