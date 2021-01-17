module.exports = (app) => {
  const {
    create,
    findAll,
    findaaa,
    update,
    deleteProduct,
    findProduct,
    findProductShop,
    updateQData
  } = require("../controllers/productDetails");

  // Create a new Product
  app.post("/products/register", create);

  // Retrieve all Product
  app.get("/products/list", findAll);

  // Retrieve a single Product with category
  app.get("/products/:category", findaaa);

  // Retrieve a single Product with Id
  app.get("/products/single/:_Id", findProduct);

  // Retrieve a  Products with shopId
  app.get("/products/view/:shopID", findProductShop);

  // Update a Product with _Id
  app.put("/products/:_Id", update);

  // Delete a Product with _Id
  app.delete("/products/:_Id", deleteProduct);

  // Update a Product with _Id
  app.put("/products/qdata/:_Id", updateQData);


 // app.put("/products/list/:_id/photo", uploadProductPhotoUpload);

  // Retrieve a single Product with category
  // app.get('/products/:category?:shopname', products.findaaa);

 // app.get("/products/list/:_id/", getproduct);

 // app.put("/products1/list/photo", createProductPhotoPath);
 
};
