module.exports = (app) => {
    const {
      create
      
    } = require("../controllers/cartdetails");
  
    // Create a new Product
    app.post("/cart/register", create);
};