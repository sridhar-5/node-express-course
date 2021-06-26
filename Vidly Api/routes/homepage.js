const Express = require("express");
const router = Express.Router();

router.get("/", (request, response) => {
  // response.send(
  //   `<h1 style="text-align:center;">Hai, Welcome to the Vidly api's official page</h1>`
  // );
  response.render("index", {
    title: "Vidly Music",
    heading: "Welcome to vidly's offical api page",
  });
});

module.exports = router;
