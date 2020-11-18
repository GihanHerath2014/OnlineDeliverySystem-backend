module.exports = (app) => {
    const {
      create,
      findAll,
      findHistory
    //   removeUserCart,
    //   removeCartItems
      
    } = require("../controllers/checkCart");
  
    // Create a new Product
    app.post("/checkout/add", create);

    app.get("/checkout/all", findAll);

    app.get("/checkout/getSelected/:u_id", findHistory);
  }