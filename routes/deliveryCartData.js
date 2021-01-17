module.exports = (app) => {
    const {
      create,
      findAll,
      update,
      findOrderbyOrderId,
    } = require("../controllers/deliveryCart");

    app.post("/deliverycart/register", create);

    app.get("/deliverycart/list", findAll);

    app.get("/deliverycart/findOrderbyOrderId/:orderId", findOrderbyOrderId);

    app.put("/deliverycart/:_Id", update);

   // app.delete("/deliverycart/:_Id", deleteProduct);
  
}