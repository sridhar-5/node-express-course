var object = require("./4-names");
var sayHi = require("./5-Utils");

// console.log(object);

object = object.names;

object.forEach((element) => {
  sayHi(element);
});
