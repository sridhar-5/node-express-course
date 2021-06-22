const EventEmitter = require("events");

const cutomEmitters = new EventEmitter();

//like we have dom events in es6
//we do have events in server side js
//
//on method listens for an event
// emit - emits an event

cutomEmitters.on("response", () => {
  console.log("data recieved");
});

customEmitters.emit("response");
