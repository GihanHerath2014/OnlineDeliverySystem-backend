module.exports = (app) => {
    const {
      create,
      findAll,
      deleteProduct,
      findByCategory_Id,
    } = require("../controllers/category");
  
    // Create a new category
    app.post("/category/register", create);
  
    // Retrieve all category
    app.get("/category/list", findAll);
  
    // Delete a category with _Id
    app.delete("/category/:_Id", deleteProduct);
  
    app.get("/category/getonedata/:category_id", findByCategory_Id);

   
  };
  