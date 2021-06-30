const Express = require("express");
const mongoose = require("mongoose");
const router = Express.Router();
const Joi = require("joi");

//defining a schema for the albums db

const albumSchema = new mongoose.Schema({
  Albumname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  writer: {
    type: String,
    //if the album is out then write must exist
    required: true,
  },
});

//creating the model
const Album = mongoose.model("album", albumSchema);

router.get("/", async (request, response) => {
  const albums = await Album.find();
  response.send(albums);
});

//get a specific album by id number
router.get("/:AlbumId", async (request, response) => {
  const paramId = request.params.AlbumId;
  const album = await Album.findById(paramId);
  if (!album) {
    response
      .status(404)
      .send(
        `<h1 style="text-align:center;">OOPS!! Album you are searching for is not found</h1>`
      );
    return;
  }
  //if the album is found in the above albums array of objects then return the album as response
  response.send(album);
});

//accept data through a post request : user can add a new album to the albums
router.post("/", async (request, response) => {
  //validate what user is trying to do first using joi

  const schema = Joi.object({
    Albumname: Joi.string().min(5).required(),
    writer: Joi.string().min(3).required(),
  });

  //object destructuring for the error message
  const { error } = schema.validate(request.body);

  if (error) {
    response.status(400).send(error.details[0].message);
    return;
  }
  //creating an new object for the new album that is to be inserted
  const album = new Album({
    Albumname: request.body.Albumname,
    writer: request.body.writer,
  });

  const savingalbum = await album.save();

  console.log(savingalbum);
  response.send(savingalbum);
});

//put request

router.put("/:AlbumId", async (request, response) => {
  //validation should be done while updating as well
  const schema = Joi.object({
    Albumname: Joi.string().min(5).required(),
    writer: Joi.string().min(3).required(),
  });

  //object destructuring for the error message
  const { error } = schema.validate(request.body);

  if (error) {
    response.status(400).send(error.details[0].message);
    return;
  }

  const album = await Album.findByIdAndUpdate(request.params.AlbumId, {
    $set: {
      Albumname: request.body.Albumname,
      writer: request.body.writer,
    },
  });

  if (!album) {
    response
      .status(404)
      .send(`<h1 style="text-align:center;">Album not found</h1>`);
    return;
  }

  //console for testing
  console.log(album);
  response.send(album);
});

//delete request
router.delete("/:AlbumId", async (request, response) => {
  const album = await Album.findByIdAndRemove(request.params.id);
  if (!album) {
    response
      .status(404)
      .send(
        `<h1 style="text-align:center;">OOPS!! Album you are searching for is not found</h1>`
      );
  }

  console.log(albums);
  response.send(album);
});

module.exports = router;
