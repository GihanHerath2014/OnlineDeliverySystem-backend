module.exports = (app) => {
    const {
      create,
      findAll,
      findHistory,
      update,
      findOrderbyOrderId,
      updateState
    //   removeUserCart,
    //   removeCartItems
      
    } = require("../controllers/checkCart");
  
    // Create a new Product
    app.post("/checkout/add", create);

    app.get("/checkout/all", findAll);

    app.get("/checkout/getSelected/:u_id", findHistory);

    app.put("/checkout/:_Id", update);

    //app.get("/deliverycart/list", findAll);

    app.get("/checkout/findOrderbyOrderId/:orderId", findOrderbyOrderId);

    app.post("/checkout/:orderId", updateState);
  }