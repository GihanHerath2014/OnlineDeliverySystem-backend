module.exports = (app) => {
    const {
      create,
      findHistory
    //   removeUserCart,
    //   removeCartItems
      
    } = require("../controllers/checkCart");
  
    // Create a new Product
    app.post("/checkout/add", create);

    app.get("/checkout/aa/bb/:u_id", findHistory);
}