const express = require("express");
const { products } = require("./data");
const app = express();

app.get("/", (request, response) => {
  response.json(products);
});

app.get("/api/products", (request, response) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  response.json(newProducts);
});

// app.get("/api/products/1", (req, res) => {
//   const singleProduct = products.find((product) => product.id === 1);
//   res.json(singleProduct);
// });
//this is a bit harsh and involves a bit of hard coding so
//we have something called request params

app.get("/api/products/:productID", (req, res) => {
  const { productID } = req.params;

  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  //this is the case when the porduct id is not existing in the api
  if (!singleProduct) {
    return res.status(404).send("Product does not exist");
  }
  res.json(singleProduct);
});

app.listen(5000, () => {
  console.log("Listening to port 5000");
});
