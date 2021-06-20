const os = require("os");

//this statement will return the info of the user
const user = os.userInfo();

// this returns the system's uptime in seconds
console.log(`Uptime of my machine is ${os.uptime()}`);

console.log(user);

//trying some of the different methods that os module has

const currentOs = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};
console.log(currentOs);
