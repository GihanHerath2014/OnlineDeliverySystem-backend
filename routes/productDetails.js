module.exports = (app) => {
  const {
    create,
    findAll,
    findaaa,
    uploadProductPhotoUpload,
    update,
    deleteProduct,
    getproduct,
    createProductPhotoPath
  } = require("../controllers/productDetails");

  // Create a new Product
  app.post("/products/register", create);

  // Retrieve all Product
  app.get("/products/list", findAll);

  // Retrieve a single Product with category
  app.get("/products/:category", findaaa);

  // Update a Product with _Id
  app.put("/products/:_Id", update);

  // Delete a Product with _Id
  app.delete("/products/:_Id", deleteProduct);

 // app.put("/products/list/:_id/photo", uploadProductPhotoUpload);

  // Retrieve a single Product with category
  // app.get('/products/:category?:shopname', products.findaaa);

 // app.get("/products/list/:_id/", getproduct);

 // app.put("/products1/list/photo", createProductPhotoPath);
 
};
