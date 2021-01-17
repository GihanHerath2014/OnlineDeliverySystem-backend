module.exports = (app) => {
    const {
      create,
      findAll,
      update,
      findOrderbyOrderId,
      findorderByD_Id,
      updateState,
    } = require("../controllers/deliveryCart");

    app.post("/deliverycart/register", create);

    app.get("/deliverycart/list", findAll);

    app.get("/deliverycart/findOrderbyOrderId/:orderId", findOrderbyOrderId);

    app.post("/deliverycart/:orderId", update);

    app.get("/deliverycart/myorders/:deliverPersonId", findorderByD_Id);

    app.post("/deliverycart/updateState/:orderId", update);

   // app.delete("/deliverycart/:_Id", deleteProduct);
  
}