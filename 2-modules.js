var object = require("./4-names");
var sayHi = require("./5-Utils");

var imp = require("./6-alternative-flavour");
// console.log(object);

object = object.names;

object.forEach((element) => {
  sayHi(element);
});

console.log(imp);

require("./7-mind-grenade");
