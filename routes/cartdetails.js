module.exports = (app) => {
    const {
      create,
      findUserCart,
      removeUserCart,
      removeCartItems
      
    } = require("../controllers/cartdetails");
  
    // Create a new Product
    app.post("/cart/register", create);

    app.get("/cart/:u_id", findUserCart);

    app.delete("/cart/:u_id", removeUserCart);

    app.delete("/cart/:_id", removeCartItems);
};