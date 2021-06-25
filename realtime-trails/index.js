//class
const Joi = require("joi");
//class
const express = require("express");

const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Course1" },
  { id: 2, name: "Course2" },
  { id: 3, name: "Course3" },
];

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/api/courses", (request, response) => {
  response.send([1, 2, 3]);
});

//post requests here
//primary rule is to never trust what client is sending you
// so input validation logic is a must

app.post("/api/courses", (request, response) => {
  //just a casual way of validating thhe request
  // if (!request.body.name || request.body.name.length < 3) {
  //   // 400 is bad request
  //   response.status(400).send("Name is a required fiels and min of 3 chars");
  //   return;
  // }

  //replacing the above validation logic with joi
  //joi needs a schema to validate
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(request.body, schema);
  console.log(result);

  const course = {
    id: courses.length + 1,
    name: request.body.name,
  };
  courses.push(course);
  response.send(course);
});

app.get("/api/courses/:id", (request, response) => {
  var course = courses.find((c) => c.id === parseInt(request.params.id));
  if (!course) {
    response.status(404).send("course with this id is not available");
  }
  response.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
