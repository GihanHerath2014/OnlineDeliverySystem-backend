module.exports = (app) => {
    const {
      create,
      findAll,
      update,
    } = require("../controllers/deliveryCart");

    app.post("/deliverycart/register", create);

    app.get("/deliverycart/list", findAll);

    app.put("/deliverycart/:_Id", update);

    app.delete("/products/:_Id", deleteProduct);
  
}