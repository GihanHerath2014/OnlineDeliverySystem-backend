module.exports = (app) => {
    const {
      create
    //   findUserCart,
    //   removeUserCart,
    //   removeCartItems
      
    } = require("../controllers/checkCart");
  
    // Create a new Product
    app.post("/checkout/add", create);
}