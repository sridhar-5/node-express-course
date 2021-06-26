const Express = require("express");

const router = Express.Router();

const albums = [
  { id: 1, Albumname: "purpose", writer: "justin bieber" },
  { id: 2, Albumname: "changes", writer: "justin bieber" },
  { id: 3, Albumname: "revival", writer: "selena gomez" },
  { id: 4, Albumname: "rare", writer: "selena gomez" },
  { id: 5, Albumname: "fearless", writer: "taylor swift" },
  { id: 6, Albumname: "desire", writer: "ariana grande" },
  { id: 7, Albumname: "crown", writer: "nick jonas" },
  { id: 8, Albumname: "baby", writer: "ludacris" },
  { id: 9, Albumname: "city life", writer: "beyonce" },
  { id: 10, Albumname: "care about us", writer: "micheal jackson" },
];

router.get("/", (request, response) => {
  response.send(albums);
});

//get a specific album by id number
router.get("/:AlbumId", (request, response) => {
  const paramId = request.params.AlbumId;
  const album = albums.find((item) => item.id === parseInt(paramId));
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
router.post("/", (request, response) => {
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
  const album = {
    id: albums.length + 1,
    Albumname: request.body.Albumname,
    writer: request.body.writer,
  };
  //pushing this instance into the albums array
  albums.push(album);
  //for testing
  console.log(albums);
  response.send(album);
});

//put request

router.put("/:AlbumId", (request, response) => {
  const album = albums.find(
    (item) => item.id === parseInt(request.params.AlbumId)
  );
  if (!album) {
    response
      .status(404)
      .send(`<h1 style="text-align:center;">Album not found</h1>`);
    return;
  }
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
  //updating if no errors occured
  album.Albumname = request.body.Albumname;
  album.writer = request.body.writer;
  //console for testing
  console.log(albums);
  response.send(album);
});

//delete request
router.delete("/:AlbumId", (request, response) => {
  const album = albums.find(
    (item) => item.id === parseInt(request.params.AlbumId)
  );
  if (!album) {
    response
      .status(404)
      .send(
        `<h1 style="text-align:center;">OOPS!! Album you are searching for is not found</h1>`
      );
  }
  const index = albums.indexOf(album);
  //splicing the albums
  albums.splice(index, 1);
  //for testing
  console.log(albums);
  response.send(album);
});

module.exports = router;